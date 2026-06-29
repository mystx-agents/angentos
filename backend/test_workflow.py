import httpx
import time

BASE_URL = "http://127.0.0.1:8000"

def test_workflow():
    print("--- Testing Full AI Workflow ---")
    
    # 1. Register User
    print("Registering user...")
    user_data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpassword"
    }
    resp = httpx.post(f"{BASE_URL}/api/auth/register", json=user_data)
    if resp.status_code == 200 or resp.status_code == 400: # 400 might be if already exists
        print(f"Register: PASS ({resp.status_code})")
    else:
        print(f"Register: FAIL ({resp.status_code} - {resp.text})")
        return

    # 2. Login
    print("Logging in...")
    login_data = {
        "username": "testuser",
        "password": "testpassword"
    }
    resp = httpx.post(f"{BASE_URL}/api/auth/login", data=login_data) # token endpoints usually take form data
    if resp.status_code == 200:
        token = resp.json().get("access_token")
        print(f"Login: PASS (Token received)")
    else:
        print(f"Login: FAIL ({resp.status_code} - {resp.text})")
        return

    # 3. Chat Workflow
    print("Sending message to AI...")
    headers = {"Authorization": f"Bearer {token}"}
    msg_data = {"content": "Hello AI, how are you today?"}
    resp = httpx.post(f"{BASE_URL}/api/messages/chat", json=msg_data, headers=headers, timeout=30.0)
    
    if resp.status_code == 200:
        print(f"Chat Workflow: PASS\nResponse: {resp.json().get('content')}")
    else:
        print(f"Chat Workflow: FAIL ({resp.status_code} - {resp.text})")

if __name__ == "__main__":
    test_workflow()
