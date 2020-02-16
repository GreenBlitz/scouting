import pickle
import pandas as pd
import datetime as dt
def to_excel():
    f = open("db_dumps/%sScoutingDump.p" % dt.datetime.now().year , "rb")
    data = pickle.load(f)

    events = data['events']
    sources = []

    for s in events:
        sources.append(s['_source'])

    pd.DataFrame(sources).to_excel('%sData.xlsx' % dt.datetime.now().year, index=False)
    print('successfully transformed .p data to xlsx format')





























