from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.database.repositories.repositories import AnalyticsRepository
from app.security.auth import get_current_user
from app.models.domain import User

router = APIRouter()

@router.get("/")
async def get_analytics(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    repo = AnalyticsRepository(db)
    return await repo.get_by_user_id(current_user.id)
