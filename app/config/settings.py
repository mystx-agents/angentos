from pydantic_settings import BaseSettings

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
