import pickle
import pandas as pd
import datetime as dt
def to_excel():
    data = pickle.load(open("/home/programmer/Desktop/scouting/scouting/db_dumps/%scoutingDump.p" % dt.date.year, "rb"))

    events = data['events']
    sources = []

    for s in events:
        sources.append(s['_source'])

    pd.DataFrame(sources).to_excel('%sData.xlsx' % dt.date.year, index=False)