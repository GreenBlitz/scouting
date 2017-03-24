import datetime, pickle, os, sys
from elasticsearch import Elasticsearch
import argparse

parser = argparse.ArgumentParser(prog='insertData.py', description='Reads a database dump file and inserts it into a current live database')
parser.add_argument('--host', type=str, default='localhost')
parser.add_argument('--port', type=int, default=9200) # Intentionally left as 9201 instead of 9200 in order to not override my own database accidently
parser.add_argument('filepath', type=str)


args = parser.parse_args()
host = args.host
port = args.port
filepath = args.filepath

yesno = raw_input("WARNING: you are going to insert, and maybe override data into your elasticsearch cluster. Are you sure? [y/n]")
if yesno != 'y':
    sys.exit("Come back again when you are 100%% confident that you want to override data in your database.")

with open(filepath, 'r') as dumpfile:
    try:
        imported_data = pickle.load(dumpfile)
    except Exception as e:
        sys.exit("Error in loading pickle file '%s'. error: %s" % (filepath, str(e)))

try:
    es = Elasticsearch([{'host': host, 'port': port}])
except Exception:
    sys.exit("Error in connection to database: %s" % str())

for index, documents in imported_data.iteritems():
    for document in documents:
        es.index(index=document['_index'], doc_type=document['_type'], id=document['_id'], body=document['_source'])
