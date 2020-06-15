from django.contrib.auth import get_user_model
from rest_framework import serializers
from apps.record.models import Record
from apps.utils import pwd_hash

AccountUser = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountUser
        fields = ['id', 'email', 'first_name', 'last_name', 'password', 'role']
        extra_kwargs = {'password': {'write_only': True}}
    
    def create(self, validated_data):
        user = AccountUser(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            password=pwd_hash(validated_data["password"]),
            role=validated_data["role"]
        )
        user.save()
        return user
    