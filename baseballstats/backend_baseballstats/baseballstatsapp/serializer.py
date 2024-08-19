from rest_framework import serializers
from .models import Player


# Creating a Serializer to convert model instances into a format that will be rendered to JSON
# This helps data be sent over HTTP and interpreted correctly
class PlayerSerializer(serializers.ModelSerializer):
    # This Meta class is for the metadata of the serializer to properly import JSON fields
    class Meta:
        model = Player
        fields = ['id', 'name', 'team', 'position', 'games_played', 'batting_average', 'home_runs',
                  'singles', 'doubles', 'triples', 'strikeouts', 'walks']

