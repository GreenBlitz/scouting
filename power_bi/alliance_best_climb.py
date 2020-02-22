# The following code to create a dataframe and remove duplicated rows is always executed and acts as a preamble for your script:

# dataset = pandas.DataFrame( game thousands Value, game tens Value, game ones Value, game hundreds Value)
# dataset = dataset.drop_duplicates()

# Paste or type your script code here:
import sys
project_path = "C:/Users/GreenBlitz/PycharmProjects/scouting"
sys.path.insert(1, project_path)
import matplotlib.pyplot as plt
import numpy as np
import data_manipulation
import team_page
import game_page
import pandas as pd
def main(alliance, game_id):
    data = data_manipulation.source_to_list(f"{project_path}/2020Data.xlsx")
    teams = game_page.get_teams(game_id)
    if teams == 'no data':
        return
    team_data = []
    team_numbers = list(teams[f'{alliance}_alliance'].keys())
    for team in team_numbers:
        team_data.append(data_manipulation.by_team(data, team))
    climb_data = []
    for team in team_data:
        climb_data.append(list(filter(lambda x: x['eventType'] == "Climb" and x['status'] == 'Success', team)))
    climb_positions = {'1st':[],'2nd':[], '3rd':[]}
    for team in climb_data:
        for game in team:
            if game['When'] == '1st':
                climb_positions['1st'].append(game['teamNumber'])
            if game['When'] == '3rd':
                climb_positions['3rd'].append(game['teamNumber'])
            if game['When'] == '2nd':
                climb_positions['2nd'].append(game['teamNumber'])
    first_second = False
    first_third = False
    second_third = False
    if len(climb_positions['1st']) != 0:
        best_climb = 0
        for team in climb_positions['1st']:
            if best_climb != 3:
                if team in climb_positions['2nd']:
                    climb_positions['2nd'].remove(team)
                    first_second = True
                if team in climb_positions['3rd']:
                    climb_positions['3rd'].remove(team)
                    first_third = True
                if len(climb_positions['2nd']) != 0:
                    for team2 in climb_positions['2nd']:
                        if team in climb_positions['3rd']:
                            climb_positions['3rd'].remove(team)
                            second_third = True
                        if len(climb_positions['3rd']) != 0:
                            best_climb = 3
                        elif (best_climb < 2):
                            best_climb = 2
                        if second_third:
                            climb_positions['3rd'].append(team)
                elif best_climb <1:
                    best_climb = 1
                if first_second:
                    climb_positions['2nd'].append(team)
                if first_third:
                    climb_positions['3rd'].append(team)
    else:
        best_climb = 0
    plt.plot([0,0,0], [0,0,0], 'w', label=f'best climb: {best_climb} robots')
    plt.rcParams.update({'font.size' : 20})
    plt.legend()

