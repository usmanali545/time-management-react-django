from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
REGULAR = "regular"
ROLES = (
    ('regular', 'Regular'),
    ('manager', 'Manager'),
    ('admin', 'Admin'),
)

class AccountUser(AbstractUser):
    # We will remove this field
    username = None
    first_name = models.TextField()
    last_name = models.TextField()
    email = models.TextField(unique=True)
    created = models.DateTimeField(auto_now_add=True)
    laste_updated = models.DateTimeField(auto_now_add=True)
    role = models.CharField(
        max_length=7,
        choices=ROLES,
        default=REGULAR,
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        managed = True
        db_table = 'account_user'
        ordering = ['-created', ]
        verbose_name = 'account_user'
        verbose_name_plural = 'account users'
        swappable = 'AUTH_USER_MODEL'
    def save(self, *args, **kwargs):
        super(AccountUser, self).save(*args, **kwargs)
