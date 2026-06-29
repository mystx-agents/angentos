import httpx
import json
import time

BASE_URL = "http://127.0.0.1:8000"

def run_tests():
    results = {}
    try:
        resp = httpx.get(f"{BASE_URL}/api/health")
        results["Health"] = f"PASS ({resp.status_code})" if resp.status_code == 200 else f"FAIL ({resp.status_code})"
    except Exception as e:
        results["Health"] = f"ERROR ({str(e)})"
        
    try:
        resp = httpx.get(f"{BASE_URL}/docs")
        results["Docs"] = f"PASS ({resp.status_code})" if resp.status_code == 200 else f"FAIL ({resp.status_code})"
    except Exception as e:
        results["Docs"] = f"ERROR"
        
    try:
        resp = httpx.get(f"{BASE_URL}/openapi.json")
        results["OpenAPI"] = f"PASS ({resp.status_code})" if resp.status_code == 200 else f"FAIL ({resp.status_code})"
    except Exception as e:
        results["OpenAPI"] = f"ERROR"

    try:
        resp = httpx.post(f"{BASE_URL}/api/agent/test-groq", json={"message": "Hello"})
        if resp.status_code == 200:
            results["Groq (/api/agent/test-groq)"] = f"PASS (Response: {resp.json().get('response', '')[:20]}...)"
        else:
            results["Groq (/api/agent/test-groq)"] = f"FAIL ({resp.status_code} - {resp.text})"
    except Exception as e:
        results["Groq (/api/agent/test-groq)"] = f"ERROR"

    print("--- API Test Report ---")
    for k, v in results.items():
        print(f"{k}: {v}")

if __name__ == "__main__":
    time.sleep(2)
    run_tests()
