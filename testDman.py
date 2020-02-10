import data_manipulation as dman
import os

data = dman.to_list()
data = dman.average(data, 'endTime')
data = dman.sum(data, 'timeTook')

dman.to_excel(data, 'hello')
print('done!!')
