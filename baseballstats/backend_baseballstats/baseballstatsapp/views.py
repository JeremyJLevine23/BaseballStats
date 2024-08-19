from rest_framework import viewsets
from .models import Player
from .serializer import PlayerSerializer


# In Django there is a feature called ViewSet which hosts the basic logic for CRUD operations
class PlayerView(viewsets.ModelViewSet):
    # Creating a QuerySet Django object to represent the collection of database queries that it will be making
    # Doing it this way makes it easier than running commands through the shell
    queryset = Player.objects.all()
    # Specifying the serializer that will be used when the api is called
    serializer_class = PlayerSerializer

