from django.db import models


# Building a model for Baseball Hitting Stats
class Player(models.Model):
    name = models.CharField(max_length=100)
    team = models.CharField(max_length=100)
    position = models.CharField(max_length=50)
    games_played = models.IntegerField()
    batting_average = models.DecimalField(max_digits=4, decimal_places=3)
    home_runs = models.IntegerField()
    singles = models.IntegerField()
    doubles = models.IntegerField()
    triples = models.IntegerField()
    strikeouts = models.IntegerField()
    walks = models.IntegerField()

    # This Meta class is going to help order players by name
    class Meta:
        ordering = ['name']

