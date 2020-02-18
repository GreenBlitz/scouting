import sys

sys.path.insert(1, 'C:/Users/GreenBlitz/PycharmProjects')
import matplotlib.pyplot as plt
import numpy as np
from scouting import data_manipulation
from scouting import team_page
import pandas as pd


def main():
    data = data_manipulation.source_to_list("C:/Users/GreenBlitz/PycharmProjects/scouting/2020Data.xlsx")
    team_data = data_manipulation.by_team(data, data[0]['teamPageNumber'])
    all_games = team_page.get_games(data)
    climb_data = list(filter(lambda x: x['eventType'] == "Climb" and x['status'] == 'Success', team_data))
    if len(climb_data) > 0:
        climb_positions = {'0': 0, '1st': 0, '2nd': 0, '3rd': 0}
        no_climb_games = list(filter(lambda x: x not in team_page.get_games(climb_data), data))
        climb_positions['0'] += len(no_climb_games)
        for event in climb_data:
            if event['When'] == '1st':
                climb_positions['1st'] += 1
            if event['When'] == '2st':
                climb_positions['2st'] += 1
            if event['When'] == '3st':
                climb_positions['3st'] += 1
        plt.pie(list(climb_positions.values()), labels=list(climb_positions.keys()))
        plt.legend()
        plt.show()
    else:
        plt.plot([0,0,0], [0,0,0], 'w', label="no data")
        plt.rcParams.update({'font.size': 40})
        plt.legend()
        plt.show()
if __name__ == '__main__':
    main()

