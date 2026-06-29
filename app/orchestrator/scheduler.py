import asyncio
from app.utils.logger import logger
from .event_bus import event_bus

class Scheduler:
    def __init__(self):
        self.running = False
        self.tasks = []
        
    def add_job(self, interval_seconds, func, *args, **kwargs):
        self.tasks.append((interval_seconds, func, args, kwargs))
        
    async def start(self):
        self.running = True
        logger.info("Scheduler started.")
        for interval, func, args, kwargs in self.tasks:
            asyncio.create_task(self._run_job(interval, func, args, kwargs))
            
    async def _run_job(self, interval, func, args, kwargs):
        while self.running:
            await asyncio.sleep(interval)
            try:
                await func(*args, **kwargs)
            except Exception as e:
                logger.error(f"Scheduler job {func.__name__} failed: {str(e)}")
                await event_bus.publish("SYSTEM_ERROR", {"error": str(e), "source": "scheduler"})

scheduler = Scheduler()
