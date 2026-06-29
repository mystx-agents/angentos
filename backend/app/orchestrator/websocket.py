from fastapi import WebSocket
from typing import List
import json
import asyncio
from .state import state

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)
        # Send initial state
        await websocket.send_json({"type": "STATE_UPDATE", "data": {
            "status": state.status,
            "queue_length": state.queue_length,
            "total_tasks": state.total_tasks,
            "running_tasks": state.running_tasks,
            "failed_tasks": state.failed_tasks,
            "avg_execution_time": state.avg_execution_time,
            "success_rate": state.success_rate,
            "retry_count": state.retry_count
        }})

    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except Exception:
                pass

ws_manager = ConnectionManager()
