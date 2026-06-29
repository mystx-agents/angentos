import groq
from app.config.settings import settings

client = groq.AsyncGroq(api_key=settings.GROQ_API_KEY)

async def generate_response(prompt: str, system_message: str = "") -> str:
    messages = []
    if system_message:
        messages.append({"role": "system", "content": system_message})
    messages.append({"role": "user", "content": prompt})
    
    response = await client.chat.completions.create(
        messages=messages,
        model="llama-3.1-8b-instant",
    )
    return response.choices[0].message.content
