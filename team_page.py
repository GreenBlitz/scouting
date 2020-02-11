import data_manipulation as dman
import os

teamNumber = 2212

def main():
    os.system(f'mkdir {teamNumber}')
    os.system(f'cd {teamNumber}')

    data = dman.to_list()
    team = dman.by_team(data, teamNumber)
    last_comp = dman.max(team, 'gameId')
    last_comp = last_comp - last_comp % 1000
    comp = dman.by_comp(team, last_comp)

    game_amount = 0
    used = []
    for i in comp:
        if i['gameId'] not in used:
            game_amount += 1
            used.append(i['gameId'])
    
    sum3 = 0
    for i in comp:
        sum3 += i['3PointSuccess']
    avg3 = sum3 / game_amount

    sum2 = 0
    for i in comp:
        sum2 += i['2PointSuccess']
    avg2 = sum2 / game_amount

    '''sum1 = 0
    for i in comp:
        sum1 += i['1PointSuccess']
    avg1 = sum1 / len(comp)'''

    avg2and3 = avg2 + avg3

    sum_defence = 0
    for i in comp:
        if i['defense'] == 'attacked':
            sum_defence += 1

    defence_precentage = sum_defence / game_amount * 100

    from_floor = False
    for i in comp:
        if i['PickupPlaces'] == 'Both' or i['PickupPlaces'] == 'Floor':
            from_floor = True
    
    


