from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.connection import get_db
from app.models.domain import SettingsModel, User
from app.security.auth import get_current_user

router = APIRouter()

@router.get("/")
async def get_settings(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    result = await db.execute(select(SettingsModel).filter(SettingsModel.user_id == current_user.id))
    return result.scalars().first()
