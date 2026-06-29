import asyncio
import websockets
import json

async def test_ws():
    uri = "ws://127.0.0.1:8000/api/agent/live"
    async with websockets.connect(uri) as websocket:
        msg = await websocket.recv()
        print("Received initial state:", json.loads(msg))
        
        # We'll just receive one more message to prove it's live
        print("Waiting for next message...")
        try:
            msg = await asyncio.wait_for(websocket.recv(), timeout=2.0)
            print("Received update:", json.loads(msg))
        except asyncio.TimeoutError:
            print("No new updates in 2s.")

asyncio.get_event_loop().run_until_complete(test_ws())
