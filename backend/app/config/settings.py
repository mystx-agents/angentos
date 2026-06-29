from pydantic_settings import BaseSettings
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "AgentOS"
    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@db:5432/agentos"
    REDIS_URL: str = "redis://redis:6379/0"
    GROQ_API_KEY: str = ""
    SECRET_KEY: str = "supersecretkey"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    class Config:
        env_file = ".env"

settings = Settings()

if settings.DATABASE_URL and settings.DATABASE_URL.startswith("postgres://"):
    settings.DATABASE_URL = settings.DATABASE_URL.replace("postgres://", "postgresql+asyncpg://", 1)
elif settings.DATABASE_URL and settings.DATABASE_URL.startswith("postgresql://"):
    settings.DATABASE_URL = settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

# Railway public proxies require SSL. If not provided, asyncpg gets ConnectionResetError.
if settings.DATABASE_URL and "rlwy.net" in settings.DATABASE_URL and "ssl" not in settings.DATABASE_URL.lower():
    if "?" in settings.DATABASE_URL:
        settings.DATABASE_URL += "&ssl=require"
    else:
        settings.DATABASE_URL += "?ssl=require"
