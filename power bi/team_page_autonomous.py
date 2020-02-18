import sys
sys.path.insert(1, 'C:/Users/GreenBlitz/PycharmProjects')
import matplotlib.pyplot as plt
import numpy as np
from scouting import data_manipulation
from scouting import team_page
import pandas as pd

def main():
    data = data_manipulation.source_to_list("C:/Users/GreenBlitz/PycharmProjects/scouting/2020Data.xlsx")
    team_data =data_manipulation.by_team(data, data[0]['teamPageNumber'])
    autonomous_data = list(filter(lambda x: x['matchPart'] == 'autonomous', team_data))
    points = [team_page.balls_by_game(autonomous_data, x)for x in range(1, 4)]
    games =[]
    if len(points[0]) > 0 or len(points[1]) > 0 or len(points[2]) >0:
        for x in range(len(points)):
            games.append(list(points[x].keys()))
        all_points = []
        for i in games:
            existed = []
            if not i in existed:
                existed.append(i)
        games = existed
        games[0].sort(reverse=True)
        for i in range(3):
            powercell = []
            powercellgame = []
            for game in games[0]:
                powercell.append(points[i][game])
            all_points.append(powercell)
        for game in games[0]:
            powercellgame.append(int(game))
        average_points = 0
        for i in range(3):
            average_points += sum(all_points[i])/len(all_points[i])*(i+1)
        average_powercells = 0
        for i in range(3):
            average_powercells += sum(all_points[i])/len(all_points[i])
        y =[]
        for i in range(len(powercellgame)):
            y.append(i+1)
        for i in all_points:
            i.reverse()
        plt.plot(y, all_points[0], 'sr--', label= '1 point')
        plt.plot(y, all_points[1], '^g-', label= '2 points')
        plt.plot(y, all_points[2], 'ob:', label= '3 points')
        plt.plot([0,0,0], [0,0,0], 'w', label=f'average powercells:  {int(average_powercells*100)/100}')
        plt.plot([0,0,0], [0,0,0], 'w', label=f'average points:  {int(average_points*100)/100}')
        plt.xticks(labels=sorted(powercellgame), ticks=y)
        plt.xlabel('game')
        plt.ylabel('powercell amount')
        plt.legend()
        plt.show()
    else:
        plt.plot([0,0,0], [0,0,0], 'w', label="no data")
        plt.rcParams.update({'font.size': 40})
        plt.legend()
        plt.show()
if __name__ == '__main__':
    main()