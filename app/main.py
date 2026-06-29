from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import time

from app.api.routers import auth, chat, reports, users, conversations, memory, analytics, settings_router, agent
from app.config.settings import settings
from app.utils.logger import logger
from app.database.connection import engine, Base, redis_client

app = FastAPI(title=settings.PROJECT_NAME, description="AgentOS API")

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = time.time()
    try:
        response = await call_next(request)
        process_time = time.time() - start_time
        logger.info(f"Method: {request.method} Path: {request.url.path} Status: {response.status_code} Process Time: {process_time:.4f}s")
        return response
    except Exception as e:
        process_time = time.time() - start_time
        logger.error(f"Method: {request.method} Path: {request.url.path} Error: {e} Process Time: {process_time:.4f}s")
        raise e

# Exception handlers
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception: {exc}")
    return JSONResponse(status_code=500, content={"message": "Internal Server Error"})

# Include Routers
app.include_router(auth.router, prefix="/api/auth", tags=["Auth"])
app.include_router(chat.router, prefix="/api/messages", tags=["Messages"])
app.include_router(reports.router, prefix="/api/reports", tags=["Reports"])
app.include_router(users.router, prefix="/api/users", tags=["Users"])
app.include_router(conversations.router, prefix="/api/conversations", tags=["Conversations"])
app.include_router(memory.router, prefix="/api/memory", tags=["Memory"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["Analytics"])
app.include_router(settings_router.router, prefix="/api/settings", tags=["Settings"])
app.include_router(agent.router, prefix="/api/agent", tags=["Agent"])
from app.instagram.routes import router as instagram_router
app.include_router(instagram_router, prefix="/api/instagram", tags=["Instagram"])

@app.get("/api/health", tags=["Health"])
async def health_check():
    return {"status": "healthy", "redis": await redis_client.ping()}

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up AgentOS...")
    import app.instagram.models
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    logger.info("Database schema initialized.")
    from app.orchestrator.queue_manager import queue_manager
    from app.orchestrator.scheduler import scheduler
    from app.orchestrator.brain import brain
    import asyncio
    asyncio.create_task(queue_manager.process_queue())
    asyncio.create_task(scheduler.start())
    logger.info("Agent Brain Orchestrator started.")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down AgentOS...")
    await engine.dispose()
    await redis_client.close()
