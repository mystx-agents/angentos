from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update, delete
from app.instagram.models import InstagramAccount, InstagramWebhookLog, InstagramEventQueue, InstagramSyncHistory
from datetime import datetime
from typing import List, Optional

class InstagramRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_account_by_user(self, user_id: int) -> Optional[InstagramAccount]:
        result = await self.db.execute(select(InstagramAccount).where(InstagramAccount.user_id == user_id))
        return result.scalars().first()

    async def get_account_by_instagram_id(self, instagram_id: str) -> Optional[InstagramAccount]:
        result = await self.db.execute(select(InstagramAccount).where(InstagramAccount.instagram_account_id == instagram_id))
        return result.scalars().first()

    async def create_account(self, data: dict) -> InstagramAccount:
        account = InstagramAccount(**data)
        self.db.add(account)
        await self.db.flush()
        return account

    async def update_account(self, account_id: int, data: dict) -> InstagramAccount:
        data["updated_at"] = datetime.utcnow()
        await self.db.execute(update(InstagramAccount).where(InstagramAccount.id == account_id).values(**data))
        await self.db.flush()
        result = await self.db.execute(select(InstagramAccount).where(InstagramAccount.id == account_id))
        return result.scalars().first()

    async def log_webhook(self, event_id: str, payload: dict, status: str = "received") -> InstagramWebhookLog:
        log = InstagramWebhookLog(event_id=event_id, payload=payload, status=status)
        self.db.add(log)
        await self.db.flush()
        return log

    async def enqueue_event(self, event_type: str, payload: dict) -> InstagramEventQueue:
        event = InstagramEventQueue(event_type=event_type, payload=payload)
        self.db.add(event)
        await self.db.flush()
        return event

    async def log_sync_history(self, account_id: int, sync_type: str, status: str, records: int = 0, error: str = None) -> InstagramSyncHistory:
        history = InstagramSyncHistory(
            account_id=account_id,
            sync_type=sync_type,
            status=status,
            records_processed=records,
            error_message=error,
            completed_at=datetime.utcnow() if status in ["success", "failed"] else None
        )
        self.db.add(history)
        await self.db.flush()
        return history
