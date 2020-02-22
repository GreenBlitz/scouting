# The following code to create a dataframe and remove duplicated rows is always executed and acts as a preamble for your script:

# dataset = pandas.DataFrame(thousands Value, tens Value, ones Value, hundreds Value)
# dataset = dataset.drop_duplicates()

# Paste or type your script code here:
import sys

project_path = "C:/Users/GreenBlitz/PycharmProjects/scouting"
sys.path.insert(1, project_path)
import matplotlib.pyplot as plt
import data_manipulation
import team_page


def main(team_id):
    data = data_manipulation.source_to_list(f"{project_path}/2020Data.xlsx")  # gets information from excel page
    team_data = data_manipulation.by_team(data, team_id)  # takes team number from power bi
    teleop_data = list(filter(lambda x: x['matchPart'] == 'autonomous', team_data))
    points = [team_page.balls_by_game(teleop_data, x) for x in range(1, 4)]  # list of hights and balls per game
    games = []

    if len(points[0]) > 0 or len(points[1]) > 0 or len(points[2]) > 0:  # if there is data
        for x in range(3):
            games.append(list(points[x].keys()))
        all_points = []
        existed = []
        for i in games:
            if not i in existed:
                existed.append(i)
        games = existed  # games is all games in points

        games[0].sort(reverse=True)  # gets the average points and powercells
        average_points = 0
        average_powercells = 0
        length = 0
        for i in range(3):
            powercell = []
            for game in games[0]:
                powercell.append(points[i][game])
            all_points.append(powercell)
            average_points += sum(powercell) * (i + 1)
            length += len(powercell)
            average_powercells += sum(all_points[i])
        average_points /= length
        average_powercells /= length

        powercellgame = []
        for game in games[0]:
            powercellgame.append(int(game))  # powercellgame is all the games by order

        y = []
        for i in range(len(powercellgame)):
            y.append(i + 1)  # y is a list of positions so the games wont have a big gap

        for i in all_points:  # the graph is turned around so i is reversed
            i.reverse()

        plt.plot(y, all_points[0], 'sr--', label='1 point')  # plotting the lines
        plt.plot(y, all_points[1], '^g-', label='2 points')
        plt.plot(y, all_points[2], 'ob:', label='3 points')

        plt.plot([0, 0, 0], [0, 0, 0], 'w',
                 label=f'average powercells:  {int(average_powercells * 100) / 100}')  # adding empty lines with the average as thair label
        plt.plot([0, 0, 0], [0, 0, 0], 'w', label=f'average points:  {int(average_points * 100) / 100}')

        plt.xticks(labels=sorted(powercellgame), ticks=y)  # creating the graph
        plt.xlabel('game')
        plt.ylabel('powercell amount')
        plt.legend()
        plt.show()

    else:
        plt.plot([0, 0, 0], [0, 0, 0], 'w', label='no data')  # writing no data
        plt.rcParams.update({'font.size': 40})
        plt.legend()
        plt.show()


if __name__ == '__main__':
    main()
