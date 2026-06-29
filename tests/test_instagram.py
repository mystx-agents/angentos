import pytest
import asyncio
from unittest.mock import patch, AsyncMock, MagicMock
from app.instagram.auth import InstagramAuth
from app.instagram.client import InstagramGraphClient
from app.instagram.utils import encrypt_token, decrypt_token
from app.instagram.services import InstagramService

@pytest.fixture
def dummy_token():
    return "test_token_123"

def test_token_encryption(dummy_token):
    encrypted = encrypt_token(dummy_token)
    assert encrypted != dummy_token
    decrypted = decrypt_token(encrypted)
    assert decrypted == dummy_token

@pytest.mark.asyncio
async def test_auth_url():
    auth = InstagramAuth()
    url = auth.get_auth_url()
    assert "api.instagram.com/oauth/authorize" in url

@pytest.mark.asyncio
@patch("httpx.AsyncClient.post")
async def test_exchange_code(mock_post):
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {"access_token": "short", "user_id": 123}
    mock_post.return_value = mock_resp
    
    auth = InstagramAuth()
    res = await auth.exchange_code_for_token("code123")
    assert res["access_token"] == "short"

@pytest.mark.asyncio
@patch("httpx.AsyncClient.request")
async def test_graph_client(mock_request):
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {"id": "123", "username": "testuser"}
    mock_request.return_value = mock_resp
    
    client = InstagramGraphClient("test_token")
    res = await client.get_user_profile("123")
    assert res["username"] == "testuser"

@pytest.mark.asyncio
@patch("app.instagram.repository.InstagramRepository.get_account_by_user")
async def test_dashboard_status(mock_get_account):
    mock_get_account.return_value = None
    # Cannot easily mock db session cleanly here without full setup, 
    # but the service layer can be tested with a mocked db if we inject a fake one.
    db = AsyncMock()
    service = InstagramService(db)
    
    status = await service.get_dashboard_status(1)
    assert status["connected"] is False
    assert status["status"] == "disconnected"
