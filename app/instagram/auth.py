import httpx
from datetime import datetime, timedelta
from app.config.settings import settings
from app.utils.logger import logger
from fastapi import HTTPException

class InstagramAuth:
    AUTH_URL = "https://api.instagram.com/oauth/authorize"
    TOKEN_URL = "https://api.instagram.com/oauth/access_token"
    GRAPH_BASE = "https://graph.instagram.com"

    def __init__(self):
        self.client_id = settings.INSTAGRAM_CLIENT_ID if hasattr(settings, "INSTAGRAM_CLIENT_ID") else "dummy_client"
        self.client_secret = settings.INSTAGRAM_CLIENT_SECRET if hasattr(settings, "INSTAGRAM_CLIENT_SECRET") else "dummy_secret"
        self.redirect_uri = settings.INSTAGRAM_REDIRECT_URI if hasattr(settings, "INSTAGRAM_REDIRECT_URI") else "http://localhost:8000/api/instagram/auth/callback"

    def get_auth_url(self) -> str:
        return f"{self.AUTH_URL}?client_id={self.client_id}&redirect_uri={self.redirect_uri}&scope=user_profile,user_media,instagram_manage_messages&response_type=code"

    async def exchange_code_for_token(self, code: str) -> dict:
        data = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "grant_type": "authorization_code",
            "redirect_uri": self.redirect_uri,
            "code": code
        }
        async with httpx.AsyncClient() as client:
            resp = await client.post(self.TOKEN_URL, data=data)
            if resp.status_code != 200:
                logger.error(f"Failed to exchange code: {resp.text}")
                raise HTTPException(status_code=400, detail="Invalid OAuth code")
            return resp.json()

    async def get_long_lived_token(self, short_lived_token: str) -> dict:
        url = f"{self.GRAPH_BASE}/access_token?grant_type=ig_exchange_token&client_secret={self.client_secret}&access_token={short_lived_token}"
        async with httpx.AsyncClient() as client:
            resp = await client.get(url)
            if resp.status_code != 200:
                logger.error(f"Failed to get long lived token: {resp.text}")
                raise HTTPException(status_code=400, detail="Failed to upgrade token")
            return resp.json()
            
    async def refresh_long_lived_token(self, long_lived_token: str) -> dict:
        url = f"{self.GRAPH_BASE}/refresh_access_token?grant_type=ig_refresh_token&access_token={long_lived_token}"
        async with httpx.AsyncClient() as client:
            resp = await client.get(url)
            if resp.status_code != 200:
                logger.error(f"Failed to refresh token: {resp.text}")
                raise HTTPException(status_code=400, detail="Failed to refresh token")
            return resp.json()
