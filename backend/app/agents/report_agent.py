from sqlalchemy.ext.asyncio import AsyncSession
from app.database.repositories.repositories import AnalyticsRepository
from datetime import datetime

class ReportAgent:
    async def generate_daily_report(self, db_session: AsyncSession) -> dict:
        repo = AnalyticsRepository(db_session)
        all_analytics = await repo.get_all()
        avg_reply = sum(a.avg_reply_time_ms for a in all_analytics) / len(all_analytics) if all_analytics else 0
        return {
            "type": "daily",
            "date": datetime.utcnow().isoformat(),
            "stats": {
                "active_users": len(all_analytics),
                "avg_platform_reply_time_ms": avg_reply
            }
        }
        
    async def generate_weekly_report(self, db_session: AsyncSession) -> dict:
        return {"type": "weekly", "date": datetime.utcnow().isoformat(), "stats": "Weekly analytics generated."}
        
    async def generate_monthly_report(self, db_session: AsyncSession) -> dict:
        return {"type": "monthly", "date": datetime.utcnow().isoformat(), "stats": "Monthly analytics generated."}
