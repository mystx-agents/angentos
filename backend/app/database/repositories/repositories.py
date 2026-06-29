from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.database.repositories.base import BaseRepository
from app.models.domain import User, Conversation, Message, Memory, Relationship, Analytics

class UserRepository(BaseRepository[User]):
    def __init__(self, session: AsyncSession):
        super().__init__(User, session)

    async def get_by_username(self, username: str) -> Optional[User]:
        result = await self.session.execute(select(self.model).filter(self.model.username == username))
        return result.scalars().first()

    async def get_by_email(self, email: str) -> Optional[User]:
        result = await self.session.execute(select(self.model).filter(self.model.email == email))
        return result.scalars().first()

class ConversationRepository(BaseRepository[Conversation]):
    def __init__(self, session: AsyncSession):
        super().__init__(Conversation, session)

    async def get_by_user_id(self, user_id: int) -> List[Conversation]:
        result = await self.session.execute(select(self.model).filter(self.model.user_id == user_id).order_by(self.model.created_at.desc()))
        return result.scalars().all()

class MessageRepository(BaseRepository[Message]):
    def __init__(self, session: AsyncSession):
        super().__init__(Message, session)

    async def get_by_conversation_id(self, conversation_id: int) -> List[Message]:
        result = await self.session.execute(select(self.model).filter(self.model.conversation_id == conversation_id).order_by(self.model.created_at.asc()))
        return result.scalars().all()

class MemoryRepository(BaseRepository[Memory]):
    def __init__(self, session: AsyncSession):
        super().__init__(Memory, session)

    async def get_by_user_id(self, user_id: int) -> List[Memory]:
        result = await self.session.execute(select(self.model).filter(self.model.user_id == user_id).order_by(self.model.importance.desc()))
        return result.scalars().all()

class RelationshipRepository(BaseRepository[Relationship]):
    def __init__(self, session: AsyncSession):
        super().__init__(Relationship, session)

    async def get_by_user_id(self, user_id: int) -> Optional[Relationship]:
        result = await self.session.execute(select(self.model).filter(self.model.user_id == user_id))
        return result.scalars().first()

class AnalyticsRepository(BaseRepository[Analytics]):
    def __init__(self, session: AsyncSession):
        super().__init__(Analytics, session)

    async def get_by_user_id(self, user_id: int) -> Optional[Analytics]:
        result = await self.session.execute(select(self.model).filter(self.model.user_id == user_id))
        return result.scalars().first()
