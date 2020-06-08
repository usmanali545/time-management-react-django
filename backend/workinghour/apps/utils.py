import binascii
import hashlib

def pwd_hash(text):
    dk = hashlib.pbkdf2_hmac('sha256', text.encode(), b'salt', 100000)
    return binascii.hexlify(dk).decode()