import requests


def get_event(event_key):
    return (requests.get(f"https://www.thebluealliance.com/api/v3/event/{event_key}/matches",
                         headers={'X-TBA-Auth-Key': "nsydEycbcbK5YX4RK2eV9uoOBiFpkcivKdYlfFF0my3M6E9AvAqyB5ByrrQlYTjG"})
            )


def get_team(team_key):
    return (requests.get(f"https://www.thebluealliance.com/api/v3/team/{team_key}",
                         headers={'X-TBA-Auth-Key': "nsydEycbcbK5YX4RK2eV9uoOBiFpkcivKdYlfFF0my3M6E9AvAqyB5ByrrQlYTjG"})
            )


def get_match(match_number):
    data = get_event(f"2020isde{match_number // 1000}")
    if data.status_code:
        return 'no data'
    return data.json()[match_number - match_number // 1000 * 1000-1]

def get_teams_in_event(event_number):
    #data = get_event(f'2020isde{event_number}').json()
    data = get_event('2020week0').json()
    teams =[]
    for match in data:
        for team in match['alliances']['red']['team_keys']:
            teams.append(team[3:])
        for team in match['alliances']['blue']['team_keys']:
            teams.append(team[3:])
    existed = []
    for team in teams:
        if team not in existed:
            existed.append(team)
    return existed
def get_teams(match_number):
    match = get_match(match_number)
    if match == 'no data':
        return 'no data'
    red_alliance = []
    blue_alliance = []
    for team in match['alliances']['blue']['team_keys']:
        blue_alliance.append({team[3:]: get_team(team).json()['nickname']})
    for team in match['alliances']['red']['team_keys']:
        red_alliance.append({team[3:]: get_team(team).json()['nickname']})
    return {'red_alliance': red_alliance, 'blue_alliance': blue_alliance}


def main():
    print(get_teams_in_event(111))
if __name__ == '__main__':
    main()
