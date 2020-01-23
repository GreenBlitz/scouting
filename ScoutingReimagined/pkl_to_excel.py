import pandas as pd

df = pd.DataFrame()
df = pd.read_pickle("/home/programmer/Desktop/scouting/scouting/db_dumps/currentDump.p")
df.to_excel('currentDump_csv.xlsx', header=False, index=False)