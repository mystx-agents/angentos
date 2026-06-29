import os
from cryptography.fernet import Fernet
from app.config.settings import settings
import base64

# Ensure secret key is 32 url-safe base64-encoded bytes
def get_fernet_key() -> bytes:
    key = settings.SECRET_KEY
    if len(key) < 32:
        key = key.ljust(32, '0')
    elif len(key) > 32:
        key = key[:32]
    return base64.urlsafe_b64encode(key.encode('utf-8'))

cipher_suite = Fernet(get_fernet_key())

def encrypt_token(token: str) -> str:
    if not token:
        return ""
    return cipher_suite.encrypt(token.encode('utf-8')).decode('utf-8')

def decrypt_token(encrypted_token: str) -> str:
    if not encrypted_token:
        return ""
    try:
        return cipher_suite.decrypt(encrypted_token.encode('utf-8')).decode('utf-8')
    except Exception:
        return ""
