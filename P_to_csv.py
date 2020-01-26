import pickle
import pandas as pd
import datetime as dt
def to_excel():
    f = open("db_dumps/2020ScoutingDump.p", "rb")
    data = pickle.load(f)

    events = data['events']
    sources = []

    for s in events:
        sources.append(s['_source'])

    pd.DataFrame(sources).to_excel('%sData.xlsx' % dt.date.year, index=False)
    print('successfully transformed .p data to xlsx format')
