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
    data = data_manipulation.source_to_list(f"{project_path}/2020Data.xlsx")
    team_data = data_manipulation.by_team(data, team_id)
    all_games = team_page.get_games(team_data)
    climb_data = list(filter(lambda x: x['eventType'] == "Climb", team_data))
    if len(climb_data) > 0:
        climb_positions = {'did not try': 0, 'tried and failed': 0, 'success': 0}
        no_climb_games = list(filter(lambda x: x not in team_page.get_games(climb_data), all_games))
        climb_positions['did not try'] += len(no_climb_games)
        for event in climb_data:
            if event['status'] == 'Success':
                climb_positions['success'] += 1
            if event['status'] == 'Fail':
                climb_positions['tried and failed'] += 1

        colors = ['yellowgreen', 'gold', 'lightskyblue']
        plt.pie(list(climb_positions.values()), radius=1.5, labels=list(climb_positions.keys()), colors=colors)
        plt.legend()
        plt.show()
    elif len(all_games) > 0:
        plt.pie([1,0], radius=1.5, labels=["did not try", " "])
        plt.legend()
        plt.show()
    else:
        plt.plot([0, 0, 0], [0, 0, 0], 'w', label='no data')  # writing no data
        plt.rcParams.update({'font.size': 40})
        plt.legend()
        plt.show()


