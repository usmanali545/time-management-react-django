from django.contrib.auth import get_user_model
from rest_framework import serializers
from apps.record.models import Record

AccountUser = get_user_model()

class OwnRecordSerializer(serializers.ModelSerializer):
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



class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ['id', 'account_user', 'detail', 'added', 'duration']
    
    def to_representation(self, instance):
        return {
            'id': instance.id,
            'full_name': (instance.account_user.first_name + " " + instance.account_user.last_name),
            'detail': instance.detail,
            'added': instance.added,
            'duration': instance.duration,
            'account_user': instance.account_user_id
        }
    
    def create(self, validated_data):
        record = Record(
            account_user=validated_data.get("account_user", None),
            detail=validated_data.get("detail", None),
            added=validated_data.get("added", None),
            duration=validated_data.get("duration", None)
        )
        record.save()
        return record
