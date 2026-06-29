from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi.security import OAuth2PasswordRequestForm
from app.database.connection import get_db
from app.database.repositories.repositories import UserRepository
from app.schemas.schemas import UserCreate, UserResponse, Token
from app.security.auth import get_password_hash, verify_password, create_access_token
from app.utils.logger import logger

router = APIRouter()

@router.post("/register", response_model=UserResponse)
async def register(user: UserCreate, db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    if await repo.get_by_username(user.username):
        raise HTTPException(status_code=400, detail="Username already registered")
    if await repo.get_by_email(user.email):
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = get_password_hash(user.password)
    db_user = await repo.create({
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_pwd,
        "role": "user"
    })
    logger.info(f"New user registered: {user.username}")
    return db_user

@router.post("/login", response_model=Token)
async def login(form_data: OAuth2PasswordRequestForm = Depends(), db: AsyncSession = Depends(get_db)):
    repo = UserRepository(db)
    user = await repo.get_by_username(form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect username or password")
        
    access_token = create_access_token(data={"sub": user.username, "role": user.role})
    logger.info(f"User logged in: {user.username}")
    return {"access_token": access_token, "token_type": "bearer"}
