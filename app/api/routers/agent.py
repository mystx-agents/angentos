from fastapi import APIRouter, Depends, HTTPException
from app.security.auth import get_current_user
from app.models.domain import User
from pydantic import BaseModel
from app.agents.groq_client import generate_response

router = APIRouter()

class GroqTestRequest(BaseModel):
    message: str

@router.post("/test-groq")
async def test_groq(req: GroqTestRequest):
    try:
        reply = await generate_response(req.message, "You are a helpful assistant.")
        return {"response": reply}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/control")
async def control_agent(command: dict, current_user: User = Depends(get_current_user)):
    if current_user.role != "admin":
        return {"error": "Unauthorized"}
    from app.orchestrator.event_bus import event_bus
    await event_bus.publish("AGENT_CONTROL", command)
    return {"status": f"Command '{command.get('action')}' executed successfully"}

from fastapi import WebSocket, WebSocketDisconnect
from app.orchestrator.websocket import ws_manager

@router.websocket("/live")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
