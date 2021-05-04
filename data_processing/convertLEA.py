"""
convert the LEA id to NCES ID
"""

import os
import numpy as np 
import pandas as pd 

import shutil

LEA_dataset_path = "" # dataset indexed by LEA ID
conversion_dataset_path = ""

# download the data
lea_data = pd.read_csv(LEA_dataset_path)
convert_data = pd.read_csv(conversion_dataset_path)


# add new column
lea_data['Agency ID - NCES Assigned [District] Latest available year'] = ""

# iterate through the LEA_dataset and send to csv with fields
error_count = 0
for i in range(len(lea_data)):
    print(i)
    lea = 'NJ-' + str(lea_data.loc[i, 'County Code']).zfill(2) + str(lea_data.loc[i, 'District Code']).zfill(4)
    print('lea', lea)
    # search for the ncesid
    try:
        print('ncesid', str(int(convert_data.loc[convert_data['State Agency ID [District] 2016-17']==lea]['Agency ID - NCES Assigned [District] Latest available year'].values[0])))
    except Exception:
        print("error ignored at index", i)
        error_count += 1
        continue
    ncesid = str(int(convert_data.loc[convert_data['State Agency ID [District] 2016-17']==lea]['Agency ID - NCES Assigned [District] Latest available year'].values[0]))
    lea_data.loc[i, 'Agency ID - NCES Assigned [District] Latest available year'] = ncesid

print(error_count)
print(lea_data.dtypes)

lea_data.to_csv(r"C:\Users\ethan\Desktop\SOC414\NJPP.csv", index=False)

