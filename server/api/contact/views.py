from django.shortcuts   import get_object_or_404

from rest_framework             import viewsets, status
from rest_framework.response    import Response
from rest_framework.decorators  import list_route

from api.contact.serializers    import ContactSerializer

class ContactViewSet(viewsets.ViewSet):

    def get_serializer_class(self):
        return ContactSerializer

    def get_queryset(self):
        return None

    @list_route(methods=['post'], permission_classes=[])
    def new(self, request):
        serializer = self.get_serializer_class()(data=request.data)
        if serializer.is_valid('create'):
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


