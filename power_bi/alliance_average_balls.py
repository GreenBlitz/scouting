# The following code to create a dataframe and remove duplicated rows is always executed and acts as a preamble for your script:

# dataset = pandas.DataFrame( game thousands Value, game tens Value, game ones Value, game hundreds Value)
# dataset = dataset.drop_duplicates()

# Paste or type your script code here:
import sys

project_path = "C:/Users/Guy Nevo Michrowski/PycharmProjects/scouting"
sys.path.insert(1, project_path)
import matplotlib.pyplot as plt
import data_manipulation
import team_page
import game_page


def main(alliance, game_id):
    data = data_manipulation.source_to_list(f"{project_path}/2020Data.xlsx")
    teams = game_page.get_teams(game_id)
    if teams == 'no data':
        plt.plot([0, 0, 0], [0, 0, 0], 'w', label=f'no data')
        plt.rcParams.update({'font.size': 40})
        plt.legend()
        return
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
    plt.plot([0, 0, 0], [0, 0, 0], 'w', label=f'average balls per game: {int(alliance_balls * 100000) / 100000}')
    plt.rcParams.update({'font.size': 20})
    plt.legend()


if __name__ == '__main__':
    main('red')
