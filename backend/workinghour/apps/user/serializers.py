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

    def update(self, instance, validated_data):
        instance.email = validated_data.get("email", instance.email)
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.role = validated_data.get("role", instance.role)
        if validated_data.get('password', None) is not None:
            instance.password = pwd_hash(validated_data["password"])
        instance.save()
        return instance
    