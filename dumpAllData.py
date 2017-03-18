import datetime, pickle, os
from elasticsearch import Elasticsearch

es = Elasticsearch([{'host': 'localhost', 'port': 9200}])

MAX_SIZE = 10000

def get_all_from_index(index):
    res = es.search(index=index, body={ 'size': MAX_SIZE, 'query': {'match_all': { } } })
    if not 'hits' in res or not 'hits' in res['hits']:
        print('Could not find documents in index %s')
        return ''
    hits = res['hits']['hits']
    for hit in hits:
        del hit['_score']
    return hits

all_games = get_all_from_index('games')
all_events = get_all_from_index('events')
all_team_game_data = get_all_from_index('team-game-data')
kibana_data = get_all_from_index('.kibana')

data = { \
    'games': all_games,\
    'events': all_events,\
    'team-game-data': all_team_game_data,\
    '.kibana': kibana_data\
}

dump_directory = 'db_dumps'
if not os.path.exists(dump_directory):
    os.makedirs(dump_directory)

filename = os.path.join(dump_directory, 'db_data_dump_%s.p' % datetime.datetime.now().strftime("%I:%M%p_%B_%d_%Y"))
with open(filename, 'w+') as dumpfile:
    pickle.dump(data, dumpfile)

print('Successfuly pickled all data into into file %s' % filename)
