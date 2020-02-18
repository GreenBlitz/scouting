import matplotlib.pyplot as plt
import data_manipulation as dman

import pandas as pd
import team_page


def main(game_id):
    global data
    data = dman.to_list()
    key = f'2020isde1_qm{game_id}'
    teams = [[111, 222, 333], [4590, 1678, 254]]  # recieves teams from TBA API
    game_data = []  # data about teams, format: [ball average, climbed ever, climbed balance this competition]
    for alliance in teams:
        game_data.append(get_alliance_data(alliance))
    plotted_data = []
    for alliance in game_data:
        for team in alliance:
            plot_climb = plt.text(x=0, y=200, s='yes' if team[1] else 'no', color='green' if team[2] else 'red')
            plot_average =
            alliance.append(plot_data)
        plotted_data.append(alliance)
    plot = pd.DataFrame(plotted_data)


def get_team_data(team):
    global data
    team_data = []
    sum_points = 0
    recent_data = team_page.get_games(dman.by_comp(dman.by_team(data, team), team_page.last_comp(team)))
    teleop = dman.
    for game in recent_data:
        sum_points += team_page.ball_score(data, game)
    sum_points /= len(recent_data)
    team_data.append(sum_points)
    overall_team = dman.by_team(data, team)
    climbed_ever = False
    for event in overall_team:
        if event['eventType'] == 'Climb' and event['status'] == 'Success':
            climbed_ever = True
    team_data.append(climbed_ever)
    balanced = False
    for event in recent_data:
        if event['eventType'] == 'Climb' and event['Balanced'] == 'Balanced':
            balanced = True
    team_data.append(balanced)

    return team_data


def get_alliance_data(alliance):
    alliance_data = []
    for team in alliance:
        alliance_data.append(get_team_data(team))
    ש
    return alliance_data


