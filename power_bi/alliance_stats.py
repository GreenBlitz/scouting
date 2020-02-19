import sys

sys.path.insert(1, 'C:/Users/GreenBlitz/PycharmProjects')
from scouting.power_bi import alliance_average_balls
from scouting.power_bi import alliance_best_climb
from scouting.power_bi import alliance_was_defence
import matplotlib.pyplot as plt


def main(alliance):
    game_id = dataset['game ones Value'][0] + dataset['game tens Value'][0] * 10 + dataset['game hundreds Value'][
        0] * 100 + dataset['game thousands Value'][0] * 1000
    alliance_average_balls.main(alliance, game_id)
    alliance_best_climb.main(alliance, game_id)
    alliance_was_defence.main(alliance, game_id)
    plt.show()


if __name__ == '__main__':
    main('red')
