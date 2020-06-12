from django.contrib.auth import get_user_model
from rest_framework import serializers
from apps.record.models import Record

AccountUser = get_user_model()

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ['id', 'detail', 'added', 'duration']
    
    def create(self, validated_data):
        user = self.context['request'].user
        record = Record(
            account_user=user,
            detail=validated_data["detail"],
            added=validated_data["added"],
            duration=validated_data["duration"]
        )
        record.save()
        return record
