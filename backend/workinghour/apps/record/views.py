from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import viewsets
from apps.record.models import Record
from apps.record.serializers import RecordSerializer, OwnRecordSerializer
from apps.utils import IsManagerOrAdmin, IsAdmin
from django.db.models import F
import datetime
import json
from django.core import serializers
from django.db.models import Sum
import decimal

class WorkingHourView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, *args, **kwargs):
        working_hour = request.data.get("working_hour", "")
        user = self.request.user
        user.working_hour = working_hour
        user.save()

        return Response(
            data={
                "working_hour": user.working_hour
            })


class ExportView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        params = self.request.query_params
        added_from = params.get("from", None).split("-")
        added_to = params.get("to", None).split("-")
        qs = Record.objects.all().filter(account_user=self.request.user)
        qs = qs.exclude(added__gt=datetime.date(int(added_to[0]), int(added_to[1]), int(added_to[2]))).exclude(
            added__lt=datetime.date(int(added_from[0]), int(added_from[1]), int(added_from[2])))

        return Response(
            data={
                "export_data": json.loads(serializers.serialize('json', qs))
            })


class OwnRecordViewSet(viewsets.ModelViewSet):
    serializer_class = OwnRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Record.objects.all().filter(account_user=self.request.user)
        params = self.request.query_params

        order = params.get("order", None)
        order_by = params.get("orderBy", None)
        added_from = params.get("from", None)
        added_to = params.get("to", None)
        
        if (added_from is not None) and (added_to is not None):
            added_from = params.get("from", None).split("-")
            added_to = params.get("to", None).split("-")
            qs = qs.exclude(added__gt=datetime.date(int(added_to[0]), int(added_to[1]), int(added_to[2]))).exclude(
                added__lt=datetime.date(int(added_from[0]), int(added_from[1]), int(added_from[2])))

        if order is not None:
            if order == 'asc':
                qs = qs.order_by(F(order_by).asc())
            else:
                qs = qs.order_by(F(order_by).desc())

        if params.get("page", None) is not None:
            current_page = int(params.get("page", None))
            rows_per_page = int(params.get("rowsPerPage", None))
            qs = qs[current_page * rows_per_page: (current_page + 1) * rows_per_page]
        return qs

    def perform_create(self, serializer):
        instance = serializer.save(owner=self.request.user)
        return instance

    def create(self, request):
        user = self.request.user
        duration = self.request.data.get("duration", None)
        if decimal.Decimal(duration) <= 0:
            return Response(status=status.HTTP_406_NOT_ACCEPTABLE)
        added = self.request.data.get("added", None)
        records = Record.objects.all().filter(account_user=user).filter(added=added)
        total_hours_on_day = records.aggregate(Sum("duration"))
        duration_sum = total_hours_on_day.get("duration__sum", 0)
        if duration_sum is not None:
            if duration_sum + decimal.Decimal(duration) > 24:
                return Response(status=status.HTTP_406_NOT_ACCEPTABLE, data={"duration_sum": (duration_sum + decimal.Decimal(duration))})

        write_serializer = OwnRecordSerializer(data=request.data, context={'request': request})
        write_serializer.is_valid(raise_exception=True)
        instance = self.perform_create(write_serializer)

        read_serializer = OwnRecordSerializer(instance, context={'request': request})
        
        return Response(read_serializer.data)

    def list(self, request):
        queryset = self.get_queryset()
        params = self.request.query_params
        total_records = len(Record.objects.all())

        added_from = params.get("from", None)
        added_to = params.get("to", None)

        if (added_from is not None) and (added_to is not None):
            added_from = params.get("from", None).split("-")
            added_to = params.get("to", None).split("-")
            qs = Record.objects.all().filter(account_user=self.request.user)
            qs = qs.exclude(added__gt=datetime.date(int(added_to[0]), int(added_to[1]), int(added_to[2]))).exclude(
                added__lt=datetime.date(int(added_from[0]), int(added_from[1]), int(added_from[2])))
            total_records = len(qs)

        serializer = OwnRecordSerializer(queryset, many=True, context={'request': request})
        return Response(data={"total_records": total_records, "data": serializer.data})



class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        qs = Record.objects.all().exclude(account_user=self.request.user)
        params = self.request.query_params

        order = params.get("order", None)
        order_by = params.get("orderBy", None)

        if order is not None:
            if order == 'asc':
                qs = qs.order_by(F(order_by).asc())
            else:
                qs = qs.order_by(F(order_by).desc())

        if params.get("page", None) is not None:
            current_page = int(params.get("page", None))
            rows_per_page = int(params.get("rowsPerPage", None))
            qs = qs[current_page * rows_per_page: (current_page + 1) * rows_per_page]

        return qs

    def list(self, request):
        queryset = self.get_queryset()
        serializer = RecordSerializer(queryset, many=True)
        return Response(data={"total_records": len(Record.objects.all().exclude(account_user=self.request.user)), "data": serializer.data})