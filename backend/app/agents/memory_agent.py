from sqlalchemy.ext.asyncio import AsyncSession
from app.database.repositories.repositories import MemoryRepository
from app.database.connection import redis_client
from app.utils.logger import logger
import json

class MemoryAgent:
    def __init__(self):
        self.cache_ttl = 3600  # 1 hour

    async def _get_cache_key(self, user_id: int) -> str:
        return f"memory:{user_id}"

    async def load_memories(self, user_id: int, db_session: AsyncSession) -> list:
        cache_key = await self._get_cache_key(user_id)
        cached_data = await redis_client.get(cache_key)
        
        if cached_data:
            logger.info(f"Memory cache hit for user {user_id}")
            return json.loads(cached_data)

        logger.info(f"Memory cache miss for user {user_id}")
        repo = MemoryRepository(db_session)
        memories = await repo.get_by_user_id(user_id)
        memory_list = [m.summary for m in memories]
        
        if memory_list:
            await redis_client.setex(cache_key, self.cache_ttl, json.dumps(memory_list))
            
        return memory_list
    
    async def save_memory(self, user_id: int, interaction: str, db_session: AsyncSession):
        if "remember" in interaction.lower() or "important" in interaction.lower():
            repo = MemoryRepository(db_session)
            await repo.create({"user_id": user_id, "summary": interaction, "importance": 5})
            logger.info(f"Saved memory for user {user_id}")
            
            cache_key = await self._get_cache_key(user_id)
            await redis_client.delete(cache_key)
