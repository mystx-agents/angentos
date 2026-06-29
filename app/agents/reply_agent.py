from app.agents.groq_client import generate_response
from app.utils.logger import logger
import asyncio

class ReplyAgent:
    async def generate_reply(self, message: str, context: dict, retries: int = 3) -> str:
        system_prompt = f"""
        You are AgentOS, an advanced AI Operating System.
        User Profile: {context.get('user_profile', 'Unknown')}
        Recent Memories: {context.get('memories', 'None')}
        Emotions: {context.get('emotions', 'Neutral')}
        Relationship: {context.get('relationship', 'Neutral')}
        """
        prompt = f"Respond to this message: {message}\nConversation History: {context.get('history', [])}"
        
        for attempt in range(retries):
            try:
                response = await generate_response(prompt, system_message=system_prompt)
                return response
            except Exception as e:
                logger.error(f"Groq API error on attempt {attempt+1}: {e}")
                if attempt == retries - 1:
                    return "I'm currently experiencing technical difficulties. Please try again later."
                await asyncio.sleep(2 ** attempt)
