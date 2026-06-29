from sqlalchemy.ext.asyncio import AsyncSession
from app.database.repositories.repositories import AnalyticsRepository, RelationshipRepository
from app.database.connection import redis_client
from app.utils.logger import logger
import random

class AnalyticsAgent:
    def __init__(self):
        self.cache_ttl = 3600
        
    async def _get_analytics_key(self, user_id: int) -> str:
        return f"analytics:{user_id}"
        
    async def analyze_emotions(self, message: str) -> dict:
        return {
            "casual": random.uniform(0.1, 0.9),
            "emotional": random.uniform(0.1, 0.9),
            "professional": random.uniform(0.1, 0.9),
            "funny": random.uniform(0.1, 0.9)
        }
        
    async def analyze_relationship(self, user_id: int, db_session: AsyncSession) -> float:
        repo = RelationshipRepository(db_session)
        rel = await repo.get_by_user_id(user_id)
        if not rel:
            await repo.create({"user_id": user_id, "score": 0.5})
            return 0.5
        return rel.score
        
    async def update_analytics(self, user_id: int, db_session: AsyncSession, reply_time_ms: float):
        repo = AnalyticsRepository(db_session)
        analytics = await repo.get_by_user_id(user_id)
        
        if not analytics:
            await repo.create({
                "user_id": user_id,
                "avg_reply_time_ms": reply_time_ms,
                "total_messages": 1
            })
        else:
            new_total = analytics.total_messages + 1
            new_avg = ((analytics.avg_reply_time_ms * analytics.total_messages) + reply_time_ms) / new_total
            await repo.update(analytics.id, {
                "avg_reply_time_ms": new_avg,
                "total_messages": new_total
            })
            
        logger.info(f"Updated analytics for user {user_id}")
        await redis_client.delete(await self._get_analytics_key(user_id))
