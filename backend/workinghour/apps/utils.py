import binascii
import hashlib
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS

def pwd_hash(text):
    dk = hashlib.pbkdf2_hmac('sha256', text.encode(), b'salt', 100000)
    return binascii.hexlify(dk).decode()


class IsManagerOrAdmin(BasePermission):
    """
    Permission check for record creation.
    """

    def has_permission(self, request, view):
        if request.user.role == 'manager' or request.user.role == 'admin':
            return True
        else:
            return False

class IsAdmin(BasePermission):
    """
    Permission check for record creation.
    """

    def has_permission(self, request, view):
        if request.user.role == 'admin':
            return True
        else:
            return False