from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import viewsets
from apps.record.models import Record
from apps.record.serializers import RecordSerializer, OwnRecordSerializer
from apps.utils import IsManagerOrAdmin, IsAdmin
from django.db.models import F


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


class OwnRecordViewSet(viewsets.ModelViewSet):
    serializer_class = OwnRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Record.objects.all().filter(account_user=self.request.user)
        total_records = len(qs)
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

        return qs, total_records

    def list(self, request):
        queryset, total_records = self.get_queryset()
        serializer = OwnRecordSerializer(queryset, many=True, context={'request': request})
        return Response(data={"total_records": total_records, "data": serializer.data})


class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    permission_classes = [IsAdmin]

    def get_queryset(self):
        qs = Record.objects.all()
        params = self.request.query_params

        order = params.get("order", None)
        order_by = params.get("orderBy", None)

        if order is not None:
            if order == 'asc':
                qs = Record.objects.order_by(F(order_by).asc())
            else:
                qs = Record.objects.order_by(F(order_by).desc())

        if params.get("page", None) is not None:
            current_page = int(params.get("page", None))
            rows_per_page = int(params.get("rowsPerPage", None))
            qs = qs[current_page * rows_per_page: (current_page + 1) * rows_per_page]

        return qs

    def list(self, request):
        queryset = self.get_queryset()
        serializer = RecordSerializer(queryset, many=True)
        return Response(data={"total_records": len(Record.objects.all()), "data": serializer.data})