from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime

class InstagramAccountBase(BaseModel):
    instagram_account_id: str
    username: Optional[str] = None
    status: Optional[str] = "active"

class InstagramAccountCreate(InstagramAccountBase):
    access_token: str
    expires_at: Optional[datetime] = None

class InstagramAccountResponse(InstagramAccountBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True

class WebhookVerification(BaseModel):
    hub_mode: str
    hub_challenge: int
    hub_verify_token: str

class InstagramDashboardStatus(BaseModel):
    connected: bool
    username: Optional[str]
    instagram_id: Optional[str]
    status: str
    token_expires_in_days: Optional[int]
    last_sync: Optional[datetime]
    last_error: Optional[str]
    webhook_status: str
