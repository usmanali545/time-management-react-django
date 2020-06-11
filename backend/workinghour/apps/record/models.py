from django.db import models
from django.contrib.auth import get_user_model

AccountUser = get_user_model()

class Record(models.Model):
    account_user = models.ForeignKey(AccountUser, on_delete=models.CASCADE)
    detail = models.TextField()
    added = models.DateField(auto_now_add=False)
    duration = models.DecimalField(max_digits=24, decimal_places=1)

    class Meta:
        db_table = 'record'
