from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.database.repositories.repositories import ConversationRepository, MessageRepository
from app.security.auth import get_current_user
from app.models.domain import User

router = APIRouter()

@router.get("/")
async def list_conversations(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    repo = ConversationRepository(db)
    return await repo.get_by_user_id(current_user.id)
    
@router.get("/{conversation_id}/messages")
async def list_messages(conversation_id: int, db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    repo = MessageRepository(db)
    return await repo.get_by_conversation_id(conversation_id)
