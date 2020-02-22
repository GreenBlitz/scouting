import sys
project_path = "C:/Users/Guy Nevo Michrowski/PycharmProjects/scouting"
sys.path.insert(1, project_path)
from power_bi import alliance_average_balls
from power_bi import alliance_best_climb
from power_bi import alliance_was_defence
import matplotlib.pyplot as plt


def main(alliance):
    #game_id = dataset['game ones Value'][0] + dataset['game tens Value'][0] * 10 + dataset['game hundreds Value'][
    #    0] * 100 + dataset['game thousands Value'][0] * 1000
    game_id = 3
    alliance_average_balls.main(alliance, game_id)
    alliance_best_climb.main(alliance, game_id)
    alliance_was_defence.main(alliance, game_id)
    plt.show()


if __name__ == '__main__':
    main('red')
