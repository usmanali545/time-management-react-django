from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import viewsets
from apps.record.models import Record
from apps.record.serializers import RecordSerializer
from apps.utils import RecordCreationPermission
from django.db.models import F

class RecordViewSet(viewsets.ModelViewSet):
    serializer_class = RecordSerializer
    permission_classes = [permissions.IsAuthenticated]

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
        return Response(data={"total_page": len(Record.objects.all()), "data": serializer.data})