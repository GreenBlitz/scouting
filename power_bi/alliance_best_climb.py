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
    team_data = data_manipulation.by_team(data, dataset['ones Value'][0] + dataset['tens Value'][0] * 10 +
                                          dataset['hundreds Value'][0] * 100 + dataset['thousands Value'][0] * 1000)
    all_games = team_page.get_games(data)
    climb_data = list(filter(lambda x: x['eventType'] == "Climb" and x['status'] == 'Success', team_data))
    climb_positions = {'1st':[],'2nd':[], '3rd':[]}
    for game in climb_data:
        if game['When'] == '1st':
            climb_positions['1st'].append(game['teamNumber'])
        if game['When'] == '3rd':
            climb_positions['3rd'].append(game['teamNumber'])
        if game['When'] == '2nd':
            climb_positions['2nd'].append(game['teamNumber'])
    if len(climb_positions['1st']) != 0:
        best_climb = 0
        for team in climb_positions['1st']:
            if best_climb != 3:
                climb_positions['2nd'].remove(team)
                climb_positions['3rd'].remove(team)
                if len(climb_positions['2nd']) != 0:
                    for team2 in climb_positions['2nd']:
                        climb_positions['3rd'].remove(team)
                        if len(climb_positions['3rd']) != 0:
                            best_climb = 3
                        elif (best_climb < 2):
                            best_climb = 2
                        climb_positions['3rd'].append(team)
                elif best_climb <1:
                    best_climb = 1
                climb_positions['2nd'].append(team)
                climb_positions['3rd'].append(team)
    else:
        best_climb = 0
    plt.plot([0,0,0], [0,0,0], 'w', label=f'best climb: {best_climb} robots')
    plt.rcParams.update({'font.size' : 20})
    plt.legend()
    plt.show()

if __name__ == '__main__':
    main('red')