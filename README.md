# The NJ School Redistricting Project


## Website

### Setup
First install all dependencies by running `python3 -m pip install -r requirements.txt`. Then start the Flask development server by running `python3 app.py`, which will start the server on port 8080. You can access the website by going to `localhost:8080` in your browser.

### Directory Structure
This project uses a standard Flask project directory structure. HTML (template) files are under `templates/`, and static files are under `static/`.


## Data Processing
The two data loading and processing files are `convertLEA.py` and `compile_district_data.py`, which are located under `data_processing/`.

`convertLEA.py` is a file used to convert datasets indexed by LEAID to an NCESID indexed set. To use,
declare the paths to the desired LEA dataset and the conversion sheet, and insert the desired dest
of the converted dataset.

It can be run with: `python convertLEA.py`.

`compile_district_data.py` is a file used to consolidate datasets into a single output .json file.
First, select the consolidation mode (District or County). Next, enumerate the list of dataset paths
one would like to aggregate. If County mode is selected, the NCES data is expected to already be for 
the county level. Finally, specify the destination at the bottom.

It can be run with: `python compile_district_data.py`.
