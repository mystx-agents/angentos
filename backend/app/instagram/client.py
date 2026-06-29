import httpx
import asyncio
from typing import Dict, Any
from app.utils.logger import logger
from fastapi import HTTPException

class InstagramGraphClient:
    BASE_URL = "https://graph.instagram.com/v21.0"
    
    def __init__(self, access_token: str):
        self.access_token = access_token
        self.headers = {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }
        self.timeout = httpx.Timeout(10.0, connect=5.0)

    async def _request(self, method: str, endpoint: str, retries=3, **kwargs) -> Dict[str, Any]:
        url = f"{self.BASE_URL}/{endpoint.lstrip('/')}"
        
        async with httpx.AsyncClient(timeout=self.timeout, headers=self.headers) as client:
            for attempt in range(retries):
                try:
                    response = await client.request(method, url, **kwargs)
                    if response.status_code == 429:
                        logger.warning(f"Rate limited by Instagram API on attempt {attempt+1}. Retrying in 2s...")
                        await asyncio.sleep(2)
                        continue
                    
                    response.raise_for_status()
                    return response.json()
                except httpx.HTTPStatusError as e:
                    logger.error(f"HTTPStatusError from Instagram API: {e.response.text}")
                    if e.response.status_code in [401, 403]:
                        raise HTTPException(status_code=401, detail="Instagram Token Expired or Invalid")
                    if attempt == retries - 1:
                        raise HTTPException(status_code=e.response.status_code, detail=f"Instagram API Error: {e.response.text}")
                except httpx.RequestError as e:
                    logger.error(f"RequestError connecting to Instagram API: {str(e)}")
                    if attempt == retries - 1:
                        raise HTTPException(status_code=503, detail="Instagram API Connection Error")
                
                await asyncio.sleep(1) # exponential backoff could be used
        return {}

    async def get_user_profile(self, user_id: str = "me") -> dict:
        return await self._request("GET", f"/{user_id}", params={"fields": "id,username,account_type,media_count"})
        
    async def get_media(self, user_id: str = "me", limit: int = 10) -> dict:
        return await self._request("GET", f"/{user_id}/media", params={"fields": "id,caption,media_type,media_url,permalink,timestamp", "limit": limit})
        
    async def send_message(self, ig_user_id: str, recipient_id: str, text: str) -> dict:
        # Note: Sending messages via Graph API typically uses the Facebook Graph API edge for Messenger/Instagram Direct
        # using the Instagram Professional account Page ID. 
        # Using placeholder structure per Meta Graph API standard for messaging.
        payload = {
            "recipient": {"id": recipient_id},
            "message": {"text": text}
        }
        return await self._request("POST", f"/{ig_user_id}/messages", json=payload)
