"""
This file aggregates various school district characteristics across datasets via NCESID
"""

import os
import numpy as np 
import pandas as pd 
import json

import shutil
# creates dict of dicts in form {NCESID; {field:values}}

# paths to all csv files you want to combine
csv_paths = [r"C:\Users\ethan\Desktop\SOC414\ELSI_NJ_dist_fin.csv", r"C:\Users\ethan\Desktop\SOC414\ELSI_NJ_dist_soc.csv"]

if not os.path.isdir(dest):
    os.makedirs(dest)

# create dict to hold all distric data{NCESID: {field: data},}
state_dict = {}
# iterate through all csvs and append data to json
for csv_path in csv_paths:
    data = pd.read_csv(csv_path)
    for i in range(len(data)):
        # extract NCESID
        NCESID = data.loc[i, 'Agency ID - NCES Assigned [District] Latest available year']
        # check to see if the dictionary exists
        if NCESID not in state_dict:
            dist_dict = {}
            state_dict[NCESID] = dist_dict
        else:
            dist_dict = state_dict[NCESID]
        # place all other fields in the district dictionary
        for field in data.columns:
            if field != 'Agency ID - NCES Assigned [District] Latest available year':
                value = data.loc[i, field]
                dist_dict[field] = value
# write out to a json file
with open("school_data.json", 'w') as outfile:
    json.dump(state_dict, outfile)
