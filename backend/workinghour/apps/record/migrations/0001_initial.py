# Generated by Django 3.0.7 on 2020-06-11 20:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('detail', models.TextField()),
                ('added', models.DateField()),
                ('duration', models.DecimalField(decimal_places=1, max_digits=24)),
            ],
        ),
    ]
