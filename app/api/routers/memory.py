from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.agents.memory_agent import MemoryAgent
from app.security.auth import get_current_user
from app.models.domain import User

router = APIRouter()
memory_agent = MemoryAgent()

@router.get("/")
async def list_memories(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await memory_agent.load_memories(current_user.id, db)
