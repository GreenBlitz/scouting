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
def main(alliance):
    data = data_manipulation.source_to_list("C:/Users/GreenBlitz/PycharmProjects/scouting/2020Data.xlsx")
    game_id = dataset['game ones Value'][0] + dataset['game tens Value'][0] * 10 + dataset['game hundreds Value'][0] * 100 + dataset['game thousands Value'][0] * 1000
    teams = game_page.get_teams(game_id)
    team_data = []
    team_numbers = list(teams[f'{alliance}_alliance'].keys())
    for team in team_numbers:
        team_data.append(data_manipulation.by_team(data, team))
    alliance_balls = 0
    games = 0
    for team in team_data:
        team_balls = 0
        for i in range(1, 4):
            for game in list(team_page.balls_by_game(team, i).values()):
                team_balls += game
                games += 1
        alliance_balls += team_balls
    alliance_balls /= games
    plt.plot([0,0,0], [0,0,0], 'w', label=f'average balls per game: {int(alliance_balls*100000)/100000}')
    plt.rcParams.update({'font.size' : 20})
    plt.legend()
    plt.show()

if __name__ == '__main__':
    main('red')