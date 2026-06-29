import time
from sqlalchemy.ext.asyncio import AsyncSession
from app.agents.safety_agent import SafetyAgent
from app.agents.reply_agent import ReplyAgent
from app.agents.memory_agent import MemoryAgent
from app.agents.analytics_agent import AnalyticsAgent
from app.database.repositories.repositories import UserRepository, ConversationRepository, MessageRepository

class AgentWorkflow:
    def __init__(self):
        self.safety = SafetyAgent()
        self.reply = ReplyAgent()
        self.memory = MemoryAgent()
        self.analytics = AnalyticsAgent()
        
    async def process_message(self, user_id: int, message: str, db_session: AsyncSession) -> str:
        start_time = time.time()
        
        user_repo = UserRepository(db_session)
        user = await user_repo.get(user_id)
        if not user:
            return "User not found."
            
        user_profile = {"id": user.id, "name": user.username, "role": user.role}
        
        conv_repo = ConversationRepository(db_session)
        conversations = await conv_repo.get_by_user_id(user_id)
        if not conversations:
            conversation = await conv_repo.create({"user_id": user_id, "title": "New Chat"})
        else:
            conversation = conversations[0]
            
        msg_repo = MessageRepository(db_session)
        
        await msg_repo.create({
            "conversation_id": conversation.id,
            "sender_role": "user",
            "content": message
        })
        
        db_history = await msg_repo.get_by_conversation_id(conversation.id)
        history = [{"role": msg.sender_role, "content": msg.content} for msg in db_history[-10:]]
        
        memories = await self.memory.load_memories(user_id, db_session)
        
        emotions = await self.analytics.analyze_emotions(message)
        relationship = await self.analytics.analyze_relationship(user_id, db_session)
        
        is_safe = await self.safety.validate(message)
        if not is_safe:
            reply = "I cannot fulfill this request due to safety policies."
        else:
            context = {
                "user_profile": user_profile,
                "memories": memories,
                "emotions": emotions,
                "relationship": relationship,
                "history": history
            }
            reply = await self.reply.generate_reply(message, context)
        
        await msg_repo.create({
            "conversation_id": conversation.id,
            "sender_role": "agent",
            "content": reply
        })
        
        end_time = time.time()
        reply_time_ms = (end_time - start_time) * 1000
        
        if is_safe:
            await self.memory.save_memory(user_id, message, db_session)
            await self.analytics.update_analytics(user_id, db_session, reply_time_ms)
        
        return reply
