import pickle
import pandas as pd

def to_excel(dumpfile):
    data = pickle.load(open("/home/programmer/Desktop/scouting/scouting/db_dumps/currentDump.p", "rb"))

    events = data['events']
    sources = []

    for s in events:
        sources.append(s['_source'])

    pd.DataFrame(sources).to_excel('data.xlsx', index=False)