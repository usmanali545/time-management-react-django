from rest_framework import serializers
from apps.record.models import Record

class RecordSerializer(serializers.Serializer):
    class Meta:
        model = Record
        fields = ['id', 'detail', 'added', 'duration']