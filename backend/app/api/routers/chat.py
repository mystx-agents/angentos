from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.connection import get_db
from app.schemas.schemas import MessageCreate, MessageResponse
from app.services.workflow import AgentWorkflow
from app.security.auth import get_current_user
from app.models.domain import User
from datetime import datetime

router = APIRouter()
workflow = AgentWorkflow()

@router.post("/chat", response_model=MessageResponse)
async def chat(msg: MessageCreate, current_user: User = Depends(get_current_user)):
    from app.orchestrator.event_bus import event_bus
    import asyncio
    
    future = asyncio.Future()
    await event_bus.publish("MESSAGE_RECEIVED", {
        "user_id": current_user.id,
        "message": msg.content,
        "future": future
    })
    
    reply = await future
    
    # Broadcast to websocket
    try:
        from app.main import manager
        import json
        await manager.broadcast(json.dumps({
            "id": int(datetime.utcnow().timestamp()),
            "sender": "ai",
            "text": reply,
            "time": datetime.utcnow().strftime("%I:%M %p")
        }))
    except Exception as e:
        pass # Ignore websocket failures in API route

    return MessageResponse(
        id=0,
        sender_role="agent",
        content=reply,
        created_at=datetime.utcnow()
    )
