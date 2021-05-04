# soc414-educationmapping

The two data loading and processing files are convertLEA.py and compile_district_data.py.

convertLEA.py is a file used to convert datasets indexed by LEAID to an NCESID indexed set. To use,
declare the paths to the desired LEA dataset and the conversion sheet, and insert the desired dest
of the converted dataset. 

it can be run with: python convertLEA.py

compile_district_data.py is a file used to consolidate datasets into a single output .json file.
First, select the consolidation mode (District or County). Next, enumerate the list of dataset paths
one would like to aggregate. If County mode is selected, the NCES data is expected to already be for 
the county level. Finally, specify the destination at the bottom. 

it can be run with: python compile_district_data.py


