"""
This file aggregates various school district characteristics across datasets via NCESID or county
"""

import os
import numpy as np 
import pandas as pd 
import json
import math

import shutil

mode = 'County'
#mode = 'District'
if mode == 'District':
    csv_paths = [r"C:\Users\ethan\Desktop\SOC414\ELSI_NJ_dist_fin.csv", r"C:\Users\ethan\Desktop\SOC414\ELSI_NJ_dist_soc.csv", r"C:\Users\ethan\Desktop\SOC414\NJPP.csv"]
elif mode == 'County':
    csv_paths = [r"C:\Users\ethan\Desktop\SOC414\NCES_County_2020.csv", r"C:\Users\ethan\Desktop\SOC414\PrincetonU2021v1.csv"]

dest = r"C:\Users\ethan\Desktop\SOC414\school_dist_data.json" 
# write path to destination json file of format {NCESID:{fields: characteristics}}

if not os.path.isdir(dest):
    os.makedirs(dest)

if mode == 'District':
    # create dict to hold all distric data{NCESID: {field: data},}
    state_dict = {}
    # iterate through all csvs and append data to json
    for csv_path in csv_paths:
        data = pd.read_csv(csv_path)
        for i in range(len(data)):
            # extract NCESID
            NCESID = (data.loc[i, 'Agency ID - NCES Assigned [District] Latest available year'])
            print(type(NCESID))

            if math.isnan(NCESID):
                continue
            else:
                NCESID = int(NCESID)
            print(NCESID)
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
                    # make sure its all json compatible
                    if isinstance(value, np.integer):
                        value = int(value)
                    elif isinstance(value, np.float):
                        value = float(value) 
                    dist_dict[field] = value
    # write out to a json file
    with open("school_data_NJPP.json", 'w') as outfile:
        json.dump(state_dict, outfile)
elif mode == 'County':
    county_data_path = r"C:\Users\ethan\Desktop\SOC414\NCES_County_2020.csv"
    njpp_data_path = r"C:\Users\ethan\Desktop\SOC414\PrincetonU2021v1.csv"

    county_data = pd.read_csv(county_data_path)
    njpp_data = pd.read_csv(njpp_data_path)
    # aggregate all the county data in njpp: resident enrollement, equalized valuation, NJ Income

    counties = njpp_data['County Name'].unique()
    print(counties)

    resident_list = []
    eq_val_list = []
    income_list = []

    for county in counties:
        residents = 0
        eq_val = 0
        income = 0

        for i in range(len(njpp_data)):
            if njpp_data.loc[i, 'County Name'] == county:
                # check for NaNs
                if not math.isnan(njpp_data.loc[i, 'Resident Enrollment']):
                    residents += int(njpp_data.loc[i, 'Resident Enrollment'])
                if not math.isnan(njpp_data.loc[i, 'Current Equalized Valuation, 2020']):
                    eq_val += int(njpp_data.loc[i, 'Current Equalized Valuation, 2020'])
                if not math.isnan(njpp_data.loc[i, 'NJ Income']):
                    income += int(njpp_data.loc[i, 'NJ Income'])
        resident_list.append(residents)
        eq_val_list.append(eq_val)
        income_list.append(income)
    
    # add this data to the NCES data
    county_data['Resident Enrollment'] = resident_list
    county_data['Current Equalized Valuation, 2020'] = eq_val_list
    county_data['NJ Income'] = income_list

    print(county_data)

    # save the new county data
    county_data.to_json("county_data.json", orient='records')
        
