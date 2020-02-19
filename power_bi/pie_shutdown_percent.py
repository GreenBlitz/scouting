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
key ="shutdown"
false="nope"
true="shutdown"


def main():
    data = data_manipulation.source_to_list("C:/Users/GreenBlitz/PycharmProjects/scouting/2020Data.xlsx")
    team_data = data_manipulation.by_team(data, dataset['ones Value'][0]+dataset['tens Value'][0]*10+dataset['hundreds Value'][0]*100+dataset['thousands Value'][0]*1000)
    stopped_working_data = list(filter(lambda x: x[key] == true or x[key] == false , team_data))
    if len(stopped_working_data) > 0:
        stopped_working = {false: 0, true: 0}
        for event in stopped_working_data:
            if event[key] == false:
                stopped_working[false] += 1
            if event[key] == true:
                stopped_working[true] += 1
        plt.pie(list(stopped_working.values()), radius=1.5, labels=list(stopped_working.keys()))
        plt.legend()
        plt.show()
    else:
        plt.plot([0,0,0], [0,0,0], 'w', label="no data")
        plt.rcParams.update({'font.size': 40})
        plt.legend()
        plt.show()
if __name__ == '__main__':
    main()

