from sqlalchemy.ext.asyncio import AsyncSession
from app.instagram.repository import InstagramRepository
from app.instagram.client import InstagramGraphClient
from app.instagram.utils import decrypt_token, encrypt_token
from app.utils.logger import logger
from datetime import datetime

class InstagramService:
    def __init__(self, db: AsyncSession):
        self.repo = InstagramRepository(db)

    async def link_account(self, user_id: int, instagram_id: str, username: str, access_token: str, expires_at: datetime):
        existing = await self.repo.get_account_by_user(user_id)
        data = {
            "user_id": user_id,
            "instagram_account_id": instagram_id,
            "username": username,
            "access_token_encrypted": encrypt_token(access_token),
            "expires_at": expires_at,
            "status": "active"
        }
        
        if existing:
            account = await self.repo.update_account(existing.id, data)
        else:
            account = await self.repo.create_account(data)
            
        await self.repo.log_sync_history(account.id, "account_link", "success")
        return account

    async def get_dashboard_status(self, user_id: int) -> dict:
        account = await self.repo.get_account_by_user(user_id)
        if not account:
            return {
                "connected": False,
                "username": None,
                "instagram_id": None,
                "status": "disconnected",
                "token_expires_in_days": None,
                "last_sync": None,
                "last_error": None,
                "webhook_status": "inactive"
            }
            
        token_expires_in = (account.expires_at - datetime.utcnow()).days if account.expires_at else None
        
        return {
            "connected": True,
            "username": account.username,
            "instagram_id": account.instagram_account_id,
            "status": account.status,
            "token_expires_in_days": token_expires_in,
            "last_sync": account.updated_at,
            "last_error": None,
            "webhook_status": "active" if account.status == "active" else "error"
        }

    async def process_webhook_event(self, payload: dict):
        # We store the event in the DB queue to be processed by orchestrator
        # The Orchestrator Brain handles sending to Groq and replying via Graph API.
        event_id = payload.get("id", "unknown")
        await self.repo.log_webhook(event_id, payload)
        
        # Meta webhooks can contain multiple entries
        entries = payload.get("entry", [])
        for entry in entries:
            messaging_events = entry.get("messaging", [])
            for event in messaging_events:
                await self.repo.enqueue_event("MESSAGE_RECEIVED", event)
                
                # Push to the live event bus so the orchestrator can pick it up
                from app.orchestrator.event_bus import event_bus
                import asyncio
                
                # Extract details
                sender_id = event.get("sender", {}).get("id")
                recipient_id = event.get("recipient", {}).get("id")
                message_text = event.get("message", {}).get("text")
                
                if message_text:
                    future = asyncio.Future()
                    await event_bus.publish("INSTAGRAM_MESSAGE_RECEIVED", {
                        "sender_id": sender_id,
                        "recipient_id": recipient_id,
                        "message": message_text,
                        "future": future
                    })
