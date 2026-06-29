import asyncio
from datetime import datetime, timedelta
from app.database.connection import SessionLocal
from app.instagram.repository import InstagramRepository
from app.instagram.auth import InstagramAuth
from app.instagram.utils import decrypt_token, encrypt_token
from app.utils.logger import logger
from sqlalchemy.future import select
from app.instagram.models import InstagramAccount
from app.orchestrator.event_bus import event_bus

class TokenManager:
    def __init__(self):
        self.auth = InstagramAuth()
        
    async def monitor_tokens(self):
        logger.info("Running Instagram token monitor...")
        async with SessionLocal() as db:
            repo = InstagramRepository(db)
            # Find tokens expiring in less than 7 days
            target_date = datetime.utcnow() + timedelta(days=7)
            result = await db.execute(select(InstagramAccount).where(InstagramAccount.expires_at <= target_date, InstagramAccount.status == "active"))
            accounts = result.scalars().all()
            
            for account in accounts:
                try:
                    decrypted_token = decrypt_token(account.access_token_encrypted)
                    refresh_data = await self.auth.refresh_long_lived_token(decrypted_token)
                    new_token = refresh_data.get("access_token")
                    expires_in = refresh_data.get("expires_in", 5184000) # Default 60 days
                    
                    new_expires_at = datetime.utcnow() + timedelta(seconds=expires_in)
                    
                    await repo.update_account(account.id, {
                        "access_token_encrypted": encrypt_token(new_token),
                        "expires_at": new_expires_at
                    })
                    logger.info(f"Successfully refreshed token for Instagram account {account.username}")
                    await db.commit()
                except Exception as e:
                    logger.error(f"Failed to refresh token for account {account.username}: {str(e)}")
                    await repo.update_account(account.id, {"status": "auth_failed"})
                    await db.commit()
                    await event_bus.publish("SYSTEM_ERROR", {"module": "instagram_token_manager", "message": f"Token refresh failed for {account.username}"})

token_manager = TokenManager()
