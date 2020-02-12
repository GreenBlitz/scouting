import data_manipulation as dman
import pandas as pd

def main(teamNumber):
    data = dman.to_list()
    team = dman.by_team(data, teamNumber)
    comp = dman.by_comp(team, last_comp(team))
    graphs = [balls_by_game(comp, x) for x in range(1, 3)]
    score_game = score_by_game(comp)
    climb_time = climbTime_by_best(comp)
    two_and_three = two_three(comp)
    balls = one_and_two_and_three(comp)
    def_precent = defense_precentage(comp)
    down_precent = shutdown_precentage(comp)

    last3 = lastThree(comp)
    last3_graphs = [balls_by_game(comp, x) for x in range(1, 3)]
    last3_score_game = score_by_game(last3)
    last3_climb_time = climbTime_by_best(last3)
    last3_two_and_three = two_three(last3)
    last3_balls = one_and_two_and_three(last3)
    last3_def_precent = defense_precentage(last3)
    last3_down_precent = shutdown_precentage(last3)

    with pd.ExcelWriter('TEAM' + str(teamNumber)) as f:
        graphs.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'IndividualBalls')
        score_game.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'Scores')
        climb_time.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'Climb')
        two_and_three.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'HexBalls')
        balls.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'Balls')
        def_precent.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'Defense')
        down_precent.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'Shutdown')

        last3_graphs.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'IndividualBallsLast3')
        last3_score_game.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'ScoresLast3')
        last3_climb_time.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'ClimbLast3')
        last3_two_and_three.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'HexBallsLast3')
        last3_balls.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'BallsLast3')
        last3_def_precent.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'DefenseLast3')
        last3_down_precent.to_excel(f, sheet_name='TEAM' + str(teamNumber) + 'ShutdownLast3')




def last_comp(data):
    max = 0
    for event in data:
        if event['gameId'] > max:
            max = event['gameId']
    
    return max / 1000 * 1000

def get_games(data):
    games = []

    for event in data:
        if event['gameId'] not in games:
            balls.update({event['gameId']: 0})
    
    return games


def balls_by_game(data, points):
    balls = {}
    point = '%dSuccess' % points
    for event in data:
        if event['gameId'] not in balls and event[point] is not None:
            balls.update({event['gameId']: 0})
    
    for event in data:
        if event[point] is not None:
            balls[event['gameId']] += 1

    return balls

def ball_score(data, gameId):
    sum = 0
    sum += balls_by_game(data, 3)[gameId] * 3
    sum += balls_by_game(data, 2)[gameId] * 2
    sum += balls_by_game(data, 1)[gameId]
    return sum

def score_by_game(data):

    games = get_games(data)

    scores = {}

    for game in games:
        scores.update({game: ball_score(data, game)})
    
    return scores

def climbTime_by_best(data):

    sum = 0
    amount = 0
    for event in data:
        if event['eventType'] == 'Climb':
            sum += event['timeTook']
            amount += 1
    

    best_time = 9000
    worst_time = -1
    for event in dman.to_list():
        print(event)
        if event['eventType'] == 'Climb':
            if event['timeTook'] > worst_time:
                worst_time = event['timeTook']
            elif event['timeTook'] < best_time:
                best_time = event['timeTook']

    average = sum / amount if amount != 0 else worst_time
    mapped = (average - worst_time) / (best_time - worst_time)

    return mapped

def two_three(data):
    balls = {}
    for event in data:
        if event['gameId'] not in balls and event[point] is not None:
            balls.update({event['gameId']: 0})
    
    for event in data:
        if event['2PointSuccess'] is not None or event['3PointSuccess'] is not None:
            balls[event['gameId']] += 1

    return balls

def one_and_two_and_three(data):
    balls = {}
    for event in data:
        if event['gameId'] not in balls and event[point] is not None:
            balls.update({event['gameId']: 0})
    
    for event in data:
        if event['1PointSuccess'] is not None or event['2PointSuccess'] is not None or event['3PointSuccess'] is not None:
            balls[event['gameId']] += 1

    return balls


def defense_precentage(data):
    
    omega = len(get_games(data))
    defended = 0
    for event in data:
        if event['defense'] == 'attacked':
            defended += 1

    return defended / omega * 100 if omega != 0 else defended * 100

def shutdown_precentage(data):
    omega = len(get_games(data))
    down = 0
    for event in data:
        if event['shutdown'] == 'shutdown':
            down += 1

    return down / omega * 100 if omega != 0 else down * 100

def lastThree(data):
    game_ids = get_games(data)
    if game_ids != []:
        one = max(game_ids)
        game_ids.remove(one)
        two = max(game_ids)
        game_ids.remove(two)
        three = max(game_ids)

        games = []
        games.append(dman.by_game(data, one))
        games.append(dman.by_game(data, two))
        games.append(dman.by_game(data, three))
        return games
    print('no games')


if __name__ == '__main__':
    main(444)