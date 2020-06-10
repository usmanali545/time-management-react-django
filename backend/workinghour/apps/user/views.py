from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework import generics

from apps.user import serializers

AccountUser = get_user_model()

# Create your views here.
class LoginView(APIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get("username", "")
        password = request.data.get("password", "")
        user = authenticate(request=None, username=username, password=password)

        if user is not None:
            return Response(
                data={
                    "token": jwt_encode_handler(
                        jwt_payload_handler(user)
                    ),
                    "user_id": user.account_user_id,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                })
        return Response(status=status.HTTP_401_UNAUTHORIZED)


class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        return Response()