from django.contrib.auth import get_user_model, authenticate
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework_jwt.settings import api_settings
from apps.utils import pwd_hash, IsManagerOrAdmin
from rest_framework import viewsets
from apps.user.serializers import UserSerializer
from django.db.models import F

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

AccountUser = get_user_model()

# Create your views here.
class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get("email", "")
        password = request.data.get("password", "")
        user = authenticate(request=None, username=username, password=password)

        if user is not None:
            return Response(
                data={
                    "token": jwt_encode_handler(
                        jwt_payload_handler(user)
                    ),
                    "user_id": user.id,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                    "role": user.role,
                    "working_hour": user.working_hour
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


class UsersViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsManagerOrAdmin]

    def get_queryset(self):
        qs = AccountUser.objects.all().exclude(id=self.request.user.id)
        total_users = len(qs)
        params = self.request.query_params

        order = params.get("order", None)
        order_by = params.get("orderBy", None)

        if order is not None:
            if order == 'asc':
                qs = AccountUser.objects.order_by(F(order_by).asc())
            else:
                qs = AccountUser.objects.order_by(F(order_by).desc())

        if params.get("page", None) is not None:
            if self.request.user.role == "manager":
                qs = qs.exclude(role="admin")
            total_users = len(qs)
            current_page = int(params.get("page", None))
            rows_per_page = int(params.get("rowsPerPage", None))
            qs = qs[current_page * rows_per_page: (current_page + 1) * rows_per_page]
            return qs, total_users

        return qs, total_users

    def list(self, request):
        queryset, total_users = self.get_queryset()
        serializer = UserSerializer(queryset, many=True)
        return Response(data={"total_users": total_users, "data": serializer.data})