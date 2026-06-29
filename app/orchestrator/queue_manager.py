import asyncio
import time
from .state import state
from app.utils.logger import logger
from .event_bus import event_bus

class QueueManager:
    def __init__(self):
        self.queue = asyncio.PriorityQueue()
        self.processing = False
        
    async def add_task(self, priority: int, func, *args, retries=3, **kwargs):
        await self.queue.put((priority, time.time(), func, args, kwargs, retries))
        state.queue_length = self.queue.qsize()
        state.total_tasks += 1
        await event_bus.publish("QUEUE_UPDATED", {"length": state.queue_length})
        
    async def process_queue(self):
        self.processing = True
        logger.info("Queue processor started.")
        while self.processing:
            try:
                task = await self.queue.get()
                priority, timestamp, func, args, kwargs, retries = task
                
                state.queue_length = self.queue.qsize()
                state.running_tasks += 1
                await event_bus.publish("TASK_STARTED", {"func": func.__name__})
                
                start_time = time.time()
                try:
                    await func(*args, **kwargs)
                    execution_time = time.time() - start_time
                    state.execution_times.append(execution_time)
                    state.avg_execution_time = sum(state.execution_times) / len(state.execution_times)
                    await event_bus.publish("TASK_COMPLETED", {"func": func.__name__, "time": execution_time})
                except Exception as e:
                    logger.error(f"Task {func.__name__} failed: {str(e)}")
                    state.failed_tasks += 1
                    if retries > 0:
                        state.retry_count += 1
                        logger.info(f"Retrying task {func.__name__} (Retries left: {retries - 1})")
                        await self.add_task(priority, func, *args, retries=retries-1, **kwargs)
                    await event_bus.publish("SYSTEM_ERROR", {"error": str(e), "func": func.__name__})
                finally:
                    state.running_tasks -= 1
                    total_completed = state.total_tasks - state.queue_length - state.running_tasks
                    if total_completed > 0:
                        state.success_rate = ((total_completed - state.failed_tasks) / total_completed) * 100
                    await event_bus.publish("QUEUE_UPDATED", {"length": state.queue_length})
                    self.queue.task_done()
            except Exception as e:
                logger.error(f"Queue processor error: {str(e)}")
                await asyncio.sleep(1)

queue_manager = QueueManager()
