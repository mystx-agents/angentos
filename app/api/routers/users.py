from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.database.repositories.repositories import UserRepository
from app.security.auth import get_current_user
from app.models.domain import User
from app.schemas.schemas import UserResponse

router = APIRouter()

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user
