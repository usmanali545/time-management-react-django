from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework import generics
from apps.record.models import Record
from apps.record.serializers import RecordSerializer
from apps.utils import RecordCreationPermission

class AddRecordView(generics.CreateAPIView):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer
    permission_classes = [permissions.IsAuthenticated]