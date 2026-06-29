from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, JSON
from datetime import datetime
from app.database.connection import Base

class InstagramAccount(Base):
    __tablename__ = "instagram_accounts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    instagram_account_id = Column(String(255), unique=True, index=True, nullable=False)
    username = Column(String(255), nullable=True)
    access_token_encrypted = Column(Text, nullable=False)
    expires_at = Column(DateTime, nullable=True)
    status = Column(String(50), default="active")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class InstagramWebhookLog(Base):
    __tablename__ = "instagram_webhook_logs"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(String(255), index=True)
    payload = Column(JSON, nullable=False)
    status = Column(String(50), default="received")
    created_at = Column(DateTime, default=datetime.utcnow)

class InstagramEventQueue(Base):
    __tablename__ = "instagram_event_queue"

    id = Column(Integer, primary_key=True, index=True)
    event_type = Column(String(255), nullable=False)
    payload = Column(JSON, nullable=False)
    status = Column(String(50), default="pending")
    retry_count = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    processed_at = Column(DateTime, nullable=True)

class InstagramSyncHistory(Base):
    __tablename__ = "instagram_sync_history"

    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(Integer, ForeignKey("instagram_accounts.id", ondelete="CASCADE"))
    sync_type = Column(String(100), nullable=False)
    status = Column(String(50), nullable=False)
    records_processed = Column(Integer, default=0)
    error_message = Column(Text, nullable=True)
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
