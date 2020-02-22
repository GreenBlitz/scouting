# The following code to create a dataframe and remove duplicated rows is always executed and acts as a preamble for your script:

# dataset = pandas.DataFrame(thousands Value, tens Value, ones Value, hundreds Value)
# dataset = dataset.drop_duplicates()

# Paste or type your script code here:
import sys

project_path = "C:/Users/GreenBlitz/PycharmProjects/scouting"
sys.path.insert(1, project_path)
import matplotlib.pyplot as plt
import data_manipulation


def main(team_id):
    data = data_manipulation.source_to_list(f"{project_path}/2020Data.xlsx")
    team_data = data_manipulation.by_team(data, team_id)
    if len(team_data):
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
        plt.figure(frameon=False)
        plt.bar([1.5, 3, 9, 10.5], [0, 1, 1, 0], color=colors, tick_label=labels, width=3)
        plt.xticks(fontsize=17)
        plt.legend()
        plt.show()
    else:
        plt.plot([0, 0, 0], [0, 0, 0], 'w', label="no data")
        plt.rcParams.update({'font.size': 40})
        plt.legend()
        plt.show()


if __name__ == '__main__':
    main()
