from app.utils.logger import logger

class SafetyAgent:
    def __init__(self):
        self.unsafe_keywords = [
            "jailbreak", "ignore previous instructions", "hack", 
            "illegal", "system prompt", "bypassed", "sudo"
        ]
        
    async def validate(self, prompt: str) -> bool:
        """Returns True if safe, False if unsafe"""
        prompt_lower = prompt.lower()
        for kw in self.unsafe_keywords:
            if kw in prompt_lower:
                logger.warning(f"Safety violation detected. Keyword: {kw}")
                return False
        return True
