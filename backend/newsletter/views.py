from rest_framework import generics
from .models import Subscriber
from .serializers import SubscriberSerializer

class SubscriberCreateView(generics.CreateAPIView):
    queryset = Subscriber.objects.all()
    serializer_class = SubscriberSerializer


