import asyncio
from typing import Callable, Dict, List

class EventBus:
    def __init__(self):
        self.subscribers: Dict[str, List[Callable]] = {}

    def subscribe(self, event_type: str, callback: Callable):
        if event_type not in self.subscribers:
            self.subscribers[event_type] = []
            
        if callback not in self.subscribers[event_type]:
            self.subscribers[event_type].append(callback)
            
    async def publish(self, event_type: str, data: dict):
        if event_type in self.subscribers:
            for callback in self.subscribers[event_type]:
                asyncio.create_task(callback(event_type, data))

event_bus = EventBus()
