import numpy as np
import pandas as pd

lor_berlin = pd.DataFrame(columns=['bezirk_id', 'bezirk_name', 'prg_id', 'prg_name', 'bzr_id', 'bzr_name', 'pnr_id', 'pnr_name'])

for i in (['01', '02','03', '04', '05', '06', '07', '08', '09', '10', '11', '12']):
    lor = pd.read_excel("LOR-Schluesselsystematik_2019.xls", sheet_name=i, header=1, dtype={1:str, 4:str, 7:str, 10: str})
    lor = lor.drop([0,1])
    lor = lor.iloc[:,0:12]
    lor = lor.drop(['Bezirk', 'Prognoseräume\nEbene 3', 'Bezirksregionen\nEbene 2', 'Planungsraum\nEbene 1'], axis = 1)
    lor.columns = ['bezirk_id', 'bezirk_name', 'prg_id', 'prg_name', 'bzr_id', 'bzr_name', 'pnr_id', 'pnr_name']
    lor.fillna(method='ffill', inplace =True)
    lor_berlin = lor_berlin.append(lor)

lor_berlin['full_id_bzr'] = lor_berlin.bezirk_id + lor_berlin.prg_id + lor_berlin.bzr_id
lor_berlin['full_id_pnr'] = lor_berlin.bezirk_id + lor_berlin.prg_id + lor_berlin.bzr_id + lor_berlin.pnr_id

lor_berlin.to_csv('preprocessed_lor.csv', index=False)