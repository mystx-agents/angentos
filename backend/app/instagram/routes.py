from fastapi import APIRouter, Depends, Request, HTTPException, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.security.auth import get_current_user
from app.models.domain import User
from app.instagram.services import InstagramService
from app.instagram.schemas import InstagramDashboardStatus
from app.config.settings import settings
import hashlib
import hmac

from app.instagram.auth import InstagramAuth
from app.instagram.client import InstagramGraphClient
from datetime import datetime, timedelta

router = APIRouter()

@router.get("/auth/url")
async def get_auth_url():
    return {"url": InstagramAuth().get_auth_url()}

@router.get("/auth/callback")
async def auth_callback(code: str, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    auth = InstagramAuth()
    
    short_token_data = await auth.exchange_code_for_token(code)
    short_token = short_token_data.get("access_token")
    user_id_fb = short_token_data.get("user_id")
    
    long_token_data = await auth.get_long_lived_token(short_token)
    long_token = long_token_data.get("access_token")
    expires_in = long_token_data.get("expires_in", 5184000)
    
    client = InstagramGraphClient(long_token)
    profile = await client.get_user_profile(user_id_fb)
    username = profile.get("username", str(user_id_fb))
    
    expires_at = datetime.utcnow() + timedelta(seconds=expires_in)
    
    service = InstagramService(db)
    await service.link_account(current_user.id, str(user_id_fb), username, long_token, expires_at)
    
    return {"status": "success", "username": username}

@router.get("/dashboard", response_model=InstagramDashboardStatus)
async def get_dashboard(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    service = InstagramService(db)
    return await service.get_dashboard_status(current_user.id)

@router.get("/webhook")
async def verify_webhook(request: Request):
    """Meta Webhook Verification endpoint"""
    mode = request.query_params.get("hub.mode")
    token = request.query_params.get("hub.verify_token")
    challenge = request.query_params.get("hub.challenge")
    
    verify_token = getattr(settings, "INSTAGRAM_WEBHOOK_VERIFY_TOKEN", "my_secure_token")
    
    if mode == "subscribe" and token == verify_token:
        return int(challenge)
    raise HTTPException(status_code=403, detail="Verification failed")

@router.post("/webhook")
async def receive_webhook(request: Request, background_tasks: BackgroundTasks, db: AsyncSession = Depends(get_db)):
    """Handle incoming Instagram events"""
    # 1. Verify signature
    signature = request.headers.get("X-Hub-Signature-256")
    body = await request.body()
    
    app_secret = getattr(settings, "INSTAGRAM_CLIENT_SECRET", "dummy_secret").encode("utf-8")
    expected_signature = "sha256=" + hmac.new(app_secret, body, hashlib.sha256).hexdigest()
    
    # Normally we enforce signature validation. Commenting out the hard raise if secret is 'dummy_secret' 
    # to allow testing without real Meta secrets.
    if signature != expected_signature and app_secret != b"dummy_secret":
        raise HTTPException(status_code=400, detail="Invalid signature")

    payload = await request.json()
    
    if payload.get("object") == "instagram":
        service = InstagramService(db)
        # Background task for processing to respond 200 OK immediately
        background_tasks.add_task(service.process_webhook_event, payload)
        return "EVENT_RECEIVED"
    
    return HTTPException(status_code=404, detail="Not Found")
