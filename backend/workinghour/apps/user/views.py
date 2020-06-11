from django.contrib.auth import get_user_model
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework import generics
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from apps.utils import pwd_hash

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

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
        first_name = request.data.get("first_name", "")
        last_name = request.data.get("last_name", "")
        email = request.data.get("email", "")
        password = request.data.get("password", "")
        user = AccountUser(
            email=email,
            first_name=first_name,
            last_name=last_name,
            password=pwd_hash(password)
        )
        user.save()
        return Response(status=status.HTTP_201_CREATED)