import sys
pycharm_path = "C:/Users/GreenBlitz/PycharmProjects/scouting"
sys.path.insert(1, pycharm_path)
import matplotlib.pyplot as plt
import data_manipulation as dman


def main(competition):
    data = dman.source_to_list(f"{pycharm_path}/2020Data.xlsx")
    data = dman.by_comp(data, competition)

    defend = {}
    colors = ['blue', 'red']
    for team in dman.get_all_teams(data):
        team_games_def = {'def_number': 0, 'game_number': 0}
        team_data = dman.by_team(data, team)
        team_games_def['game_number'] = len(dman.get_team_games(team_data, team))
        for game in dman.get_team_games(data, team):
            game_data = dman.by_game(team_data, game)
            for event in game_data:
                if event["eventType"] == 'Finish' and event["defense"] == 'attacked':
                    team_games_def['def_number'] += 1
        def_percent =team_games_def['def_number']/team_games_def['game_number']*100
        defend[team] = def_percent
    x=[]
    for i in range(len(defend)):
        x.append(i)
    plt.bar(x, height=list(defend.values()), tick_label=list(defend.keys()))
    plt.legend()
    plt.show()


if __name__ == '__main__':
    main(1)
