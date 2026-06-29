from pydantic import BaseModel, EmailStr
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    is_vip: bool
    role: str
    created_at: datetime
    class Config:
        from_attributes = True

class MessageCreate(BaseModel):
    content: str

class MessageResponse(BaseModel):
    id: int
    sender_role: str
    content: str
    created_at: datetime
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
