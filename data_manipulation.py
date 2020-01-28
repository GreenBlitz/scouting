import pandas
import datetime
import os


def to_list():
    data_frame = pandas.DataFrame()
    data_frame = pandas.read_excel('%sData.xlsx' % datetime.datetime.now().year)
    sources = []
    for row in data_frame.index:
        dic = {}
        for col in data_frame:
            dic[col] = data_frame.at[row, col]
        sources.append(dic)

    return sources

def by_comp(data: list(dict()), comp: int):
    filtered = []
    range_ = comp * 1000 - 1000
    for i in data:
        print(type(i))
        if(range_ <= int(i['gameId']) < range_ + 1000):
            filtered.append(i)
    return filtered

def by_team(data: list(dict()), team_number: int):
    filtered = []
    for i in data:
        if(i['teamNumber'] == team_number):
            filtered.append(i)
    return filtered

def by_game(data: list(dict()), gameId: int):
    filtered = []
    for i in data:
        if(i['gameId'] == gameId):
            filtered.append(i)
    
    return filtered

                                                                            
