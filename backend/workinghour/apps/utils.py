import binascii
import hashlib
from rest_framework import permissions

def pwd_hash(text):
    dk = hashlib.pbkdf2_hmac('sha256', text.encode(), b'salt', 100000)
    return binascii.hexlify(dk).decode()


class RecordCreationPermission(permissions.BasePermission):
    """
    Permission check for record creation.
    """

    def has_permission(self, request, view):
        return True