# The following code to create a dataframe and remove duplicated rows is always executed and acts as a preamble for your script:

# dataset = pandas.DataFrame( game thousands Value, game tens Value, game ones Value, game hundreds Value)
# dataset = dataset.drop_duplicates()

# Paste or type your script code here:
import sys

sys.path.insert(1, 'C:/Users/GreenBlitz/PycharmProjects')
import matplotlib.pyplot as plt
import numpy as np
from scouting import data_manipulation
from scouting import team_page
from scouting import game_page
import pandas as pd


def main(alliance, game_id):
    data = data_manipulation.source_to_list("C:/Users/GreenBlitz/PycharmProjects/scouting/2020Data.xlsx")
    teams = game_page.get_teams(game_id)
    if teams == 'no data':
        return
    team_data = []
    team_numbers = list(teams[f'{alliance}_alliance'].keys())
    for team in team_numbers:
        team_data.append(data_manipulation.by_team(data, team))
    defended =False
    for team in team_data:
        if team_page.defence_ever(team):
            defended = True
    plt.plot([0, 0, 0], [0, 0, 0], 'w', label=f'defended: {defended}')
    plt.rcParams.update({'font.size': 22})
    plt.legend()