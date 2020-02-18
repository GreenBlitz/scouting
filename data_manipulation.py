import pandas as pd
import datetime
import os

def to_list():
    data_frame = pd.read_excel('%sData.xlsx' % datetime.datetime.now().year)
    sources = []
    for row in data_frame.index:
        dic = {}
        for col in data_frame:
            dic[col] = data_frame.at[row, col]
        sources.append(dic)

    return sources


def source_to_list(source):
    data_frame = pd.read_excel(source)
    sources = []
    for row in data_frame.index:
        dic = {}
        for col in data_frame:
            dic[col] = data_frame.at[row, col]
        sources.append(dic)

    return sources


def to_excel(dt, name):
    pd.DataFrame(dt).to_excel('%s%s.xlsx' % (datetime.datetime.now().year, name), index=False)


def by_comp(data, comp):
    filtered = []
    for i in data:
        if comp <= i['gameId'] < comp + 1000:
            filtered.append(i)
    data.append(data[-2:])

    return filtered


def by_team(data, team_number):
    filtered = []
    for i in data:
        if i['teamNumber'] == team_number:
            filtered.append(i)

    return filtered


def by_game(data, gameId):
    filtered = []
    for i in data:
        if i['gameId'] == gameId:
            filtered.append(i)

    return filtered


def by_eventType(data, eventType):
    filtered = []
    for i in data:
        if i['eventType'] == eventType:
            filtered.append(i)
    return filtered


def by_height(data, height):
    filtered = []
    for i in data:
        if i['Height'] == height:
            filtered.append(i)

    return filtered


def average(data, trait):
    data[-2][trait] = total(data, trait) / (len(data) - 1)

    return data


def sum(data, trait):
    data[-1][trait] = total(data, trait)

    return data


def total(data, trait):
    sum = 0
    for i in data[0:-2]:
        sum += i[trait]

    return sum


def rank(data, trait, rank):
    result = None
    for i in range(rank):
        result = None
        for j in data:
            if result is None or j[trait] > result[trait]:
                result = j
        data.remove(result)
    return result


def booleanPrecent(data, trait, yesTrait):
    sum = 0
    for event in data:
        sum += 1 if event[trait] == yesTrait else 0
    return sum / len(data) * 100


def max(data, trait):
    max = None
    for i in data:
        if i is None or i[trait] > max[trait]:
            max = i
    return max


def min(data, trait):
    min = None
    for i in data:
        if i is None or i[trait] < max[trait]:
            min = i
    return min


def get_team_games(data, team):
    i_ds = []
    data = by_team(data, team)
    for event in data:
        if event['gameId'] not in i_ds:
            i_ds.append(event['gameId'])

    return i_ds


def get_all_teams(data):
    teams = []

    for event in data:
        if event["teamNumber"] not in teams:
            teams.append(event["teamNumber"])

    teams.sort()

    return teams
def by_game_phase(data, phase):
    filtered = []
    for event in data:
        if event['mathPart'] == phase:
            filtered.append(event)

    return filtered
