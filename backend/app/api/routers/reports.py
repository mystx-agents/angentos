from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.agents.report_agent import ReportAgent
from app.security.auth import get_current_user
from app.models.domain import User

router = APIRouter()
report_agent = ReportAgent()

@router.get("/daily")
async def get_daily_report(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await report_agent.generate_daily_report(db)

@router.get("/weekly")
async def get_weekly_report(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await report_agent.generate_weekly_report(db)

@router.get("/monthly")
async def get_monthly_report(db: AsyncSession = Depends(get_db), current_user: User = Depends(get_current_user)):
    return await report_agent.generate_monthly_report(db)
