import asyncio
from app.utils.logger import logger
from .event_bus import event_bus
from .queue_manager import queue_manager
from .state import state
from .websocket import ws_manager
from app.services.workflow import AgentWorkflow
from app.database.connection import SessionLocal

class AgentBrain:
    def __init__(self):
        self.workflow = AgentWorkflow()
        self._setup_subscriptions()
        
    def _setup_subscriptions(self):
        event_bus.subscribe("MESSAGE_RECEIVED", self.handle_message_received)
        event_bus.subscribe("STATE_CHANGED", self.handle_state_changed)
        event_bus.subscribe("SYSTEM_ERROR", self.handle_error)
        event_bus.subscribe("QUEUE_UPDATED", self.handle_queue_updated)
        event_bus.subscribe("TASK_STARTED", self.handle_task_started)
        event_bus.subscribe("TASK_COMPLETED", self.handle_task_completed)
        event_bus.subscribe("INSTAGRAM_MESSAGE_RECEIVED", self.handle_instagram_message_received)
        
        # Scheduler Jobs
        from .scheduler import scheduler
        from app.instagram.token_manager import token_manager
        
        scheduler.add_job(86400, self.daily_task)
        scheduler.add_job(3600, self.hourly_cleanup)
        scheduler.add_job(300, self.health_check)
        
        # Instagram specific
        scheduler.add_job(86400, token_manager.monitor_tokens)
        scheduler.add_job(86400, self.webhook_cleanup)
        scheduler.add_job(86400, self.sync_history_cleanup)

    async def daily_task(self):
        logger.info("Running daily tasks: Reports & Analytics")
        await event_bus.publish("REPORT_CREATED", {"type": "daily"})

    async def hourly_cleanup(self):
        logger.info("Running hourly cleanup: Memory & Cache")

    async def health_check(self):
        logger.info("Running health checks")

    async def webhook_cleanup(self):
        logger.info("Cleaning up old webhook logs")
        async with SessionLocal() as db_session:
            # Add cleanup logic if necessary (e.g. delete from InstagramWebhookLog where created_at < 30 days)
            pass

    async def sync_history_cleanup(self):
        logger.info("Cleaning up old sync history logs")
        async with SessionLocal() as db_session:
            pass
        
    async def set_state(self, new_status: str):
        state.status = new_status
        await event_bus.publish("STATE_CHANGED", {"status": new_status})
        
    async def handle_state_changed(self, event_type, data):
        await ws_manager.broadcast({"type": "STATE_UPDATE", "data": {
            "status": state.status,
            "queue_length": state.queue_length,
            "total_tasks": state.total_tasks,
            "running_tasks": state.running_tasks,
            "failed_tasks": state.failed_tasks,
            "avg_execution_time": state.avg_execution_time,
            "success_rate": state.success_rate,
            "retry_count": state.retry_count
        }})
        
    async def handle_error(self, event_type, data):
        await ws_manager.broadcast({"type": "SYSTEM_ERROR", "data": data})
        
    async def handle_queue_updated(self, event_type, data):
        await self.handle_state_changed(event_type, data)

    async def handle_task_started(self, event_type, data):
        logger.info(f"Task started: {data.get('func')}")

    async def handle_task_completed(self, event_type, data):
        logger.info(f"Task completed: {data.get('func')} in {data.get('time'):.4f}s")

    async def process_chat_message(self, user_id: int, message: str, future: asyncio.Future):
        try:
            await self.set_state("Thinking")
            async with SessionLocal() as db_session:
                reply = await self.workflow.process_message(user_id, message, db_session)
                await event_bus.publish("MESSAGE_SENT", {"user_id": user_id, "reply": reply})
                future.set_result(reply)
        except Exception as e:
            logger.error(f"Error in process_chat_message: {str(e)}")
            if not future.done():
                future.set_exception(e)
            await self.set_state("Error")
            raise e
        finally:
            await self.set_state("Idle")

    async def handle_message_received(self, event_type, data):
        user_id = data.get("user_id")
        message = data.get("message")
        future = data.get("future")
        
        # Add to priority queue (lower number = higher priority)
        from .queue_manager import queue_manager
        await queue_manager.add_task(1, self.process_chat_message, user_id, message, future)

    async def process_instagram_message(self, sender_id: str, recipient_id: str, message: str, future: asyncio.Future):
        try:
            await self.set_state("Thinking")
            async with SessionLocal() as db_session:
                from app.instagram.repository import InstagramRepository
                from app.instagram.client import InstagramGraphClient
                from app.instagram.utils import decrypt_token
                
                # Fetch linked user
                ig_repo = InstagramRepository(db_session)
                account = await ig_repo.get_account_by_instagram_id(recipient_id)
                
                if account:
                    # 1. Use existing workflow for AI logic (Memory, Safety, LLM)
                    reply = await self.workflow.process_message(account.user_id, f"[IG User {sender_id}]: {message}", db_session)
                    
                    # 2. Reply via Official Graph API
                    token = decrypt_token(account.access_token_encrypted)
                    client = InstagramGraphClient(token)
                    await client.send_message(recipient_id, sender_id, reply)
                    
                    await event_bus.publish("INSTAGRAM_MESSAGE_SENT", {"user_id": account.user_id, "reply": reply})
                future.set_result(True)
        except Exception as e:
            logger.error(f"Error in process_instagram_message: {str(e)}")
            if not future.done():
                future.set_exception(e)
            await self.set_state("Error")
            raise e
        finally:
            await self.set_state("Idle")

    async def handle_instagram_message_received(self, event_type, data):
        sender_id = data.get("sender_id")
        recipient_id = data.get("recipient_id")
        message = data.get("message")
        future = data.get("future")
        
        from .queue_manager import queue_manager
        await queue_manager.add_task(1, self.process_instagram_message, sender_id, recipient_id, message, future)

brain = AgentBrain()
