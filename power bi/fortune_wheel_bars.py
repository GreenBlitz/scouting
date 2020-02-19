# The following code to create a dataframe and remove duplicated rows is always executed and acts as a preamble for your script:

# dataset = pandas.DataFrame(thousands Value, tens Value, ones Value, hundreds Value)
# dataset = dataset.drop_duplicates()

# Paste or type your script code here:
import sys

sys.path.insert(1, 'C:/Users/GreenBlitz/PycharmProjects')
import matplotlib.pyplot as plt
import numpy as np
from scouting import data_manipulation
from scouting import team_page
import pandas as pd


def main():
    data = data_manipulation.source_to_list("C:/Users/GreenBlitz/PycharmProjects/scouting/2020Data.xlsx")
    team_data = data_manipulation.by_team(data, dataset['ones Value'][0] + dataset['tens Value'][0] * 10 +
                                          dataset['hundreds Value'][0] * 100 + dataset['thousands Value'][0] * 1000)
    fortune_wheel_data = list(filter(lambda x: x['fortune wheel'] == 'no can do'
                                               or x['fortune wheel'] == 'rotation control'
                                               or x['fortune wheel'] == 'position control'
                                               or x['fortune wheel'] == 'both', team_data))
    position_control = False
    rotation_control = False
    for game in fortune_wheel_data:
        if game['fortune wheel'] == 'rotation control':
            rotation_control = True
        if game['fortune wheel'] == 'position control':
            position_control = True
        if game['fortune wheel'] == 'both':
            rotation_control = True
            position_control = True
    labels = ['', 'rotation:', 'position:', '']
    if rotation_control:
        labels[1] += ' can'
    else:
        labels[1] += ' cannot'
    if position_control:
        labels[2] += ' can'
    else:
        labels[2] += ' cannot'
    colors = []
    if rotation_control:
        colors.append('green')
    else:
        colors.append('red')
    if position_control:
        colors.append('green')
    else:
        colors.append('red')
    colors.reverse()
    plt.yticks([])
    plt.bar([1.5, 3, 9, 10.5], [0, 1, 1, 0], color=colors, tick_label=labels, width=3)
    plt.xticks(fontsize=17)
    plt.legend()
    plt.show()


if __name__ == '__main__':
    main()
