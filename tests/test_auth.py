from app.security.auth import get_password_hash, verify_password, create_access_token
from datetime import timedelta

def test_password_hashing():
    pwd = "supersecretpassword123"
    hashed = get_password_hash(pwd)
    assert verify_password(pwd, hashed) == True
    assert verify_password("wrong", hashed) == False

def test_access_token_creation():
    data = {"sub": "testuser", "role": "user"}
    token = create_access_token(data, timedelta(minutes=15))
    assert type(token) == str
    assert len(token) > 20
