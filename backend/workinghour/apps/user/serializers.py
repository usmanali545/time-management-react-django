from django.contrib.auth import get_user_model

from rest_framework.response import Response
from rest_framework import serializers, status
from apps.utils import (
  pwd_hash
)

AccountUser = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountUser
        fields = [
            'user_id',
            'username',
            'first_name',
            'last_name',
            'email',
            'password',
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        try:
            user = AccountUser(
                email=validated_data['email'],
                first_name=validated_data['first_name'],
                last_name=validated_data['last_name'],
                password=pwd_hash(validated_data['password'])
            )

            user.save()
            return user
        except Exception as e:
            send_slack_update('Pardot API signup form submit error', {
                'Error': str(e)
            }, '#216c2a')

        return Response(status=status.HTTP_403_FORBIDDEN)
