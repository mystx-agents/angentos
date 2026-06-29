from typing import Generic, TypeVar, Type, Optional, List, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import delete, update
from app.database.connection import Base

ModelType = TypeVar("ModelType", bound=Base)

class BaseRepository(Generic[ModelType]):
    def __init__(self, model: Type[ModelType], session: AsyncSession):
        self.model = model
        self.session = session

    async def get(self, id: Any) -> Optional[ModelType]:
        result = await self.session.execute(select(self.model).filter(self.model.id == id))
        return result.scalars().first()

    async def get_all(self, skip: int = 0, limit: int = 100) -> List[ModelType]:
        result = await self.session.execute(select(self.model).offset(skip).limit(limit))
        return result.scalars().all()

    async def create(self, obj_in: dict) -> ModelType:
        db_obj = self.model(**obj_in)
        self.session.add(db_obj)
        await self.session.flush()
        await self.session.refresh(db_obj)
        return db_obj

    async def update(self, id: Any, obj_in: dict) -> Optional[ModelType]:
        await self.session.execute(update(self.model).where(self.model.id == id).values(**obj_in))
        await self.session.flush()
        return await self.get(id)

    async def delete(self, id: Any) -> bool:
        result = await self.session.execute(delete(self.model).where(self.model.id == id))
        await self.session.flush()
        return result.rowcount > 0
