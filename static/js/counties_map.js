mapboxgl.accessToken = "pk.eyJ1IjoiaGN6aGFvIiwiYSI6ImNrbWszcTFqMTB4ZTYycG11Ynlyb3UxNzUifQ.JuA7bKyFv7GUstkueJx0gA";

var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/hczhao/cknzgf0ka07ec17jszpdoe048",
    center: [-74.7, 40],
    zoom: 7.5
});

$.getJSON("/json/county_data.json", function(data) {
    county_data = data;
    console.log(county_data[0])
}).fail(function(jqxhr, textStatus, err) {console.log(err);});

chart = new Chart(document.getElementById("demographics-chart"),
                  {
                      type: "doughnut",
                      data: {
                          labels: ["American Indian/Alaska Native", "Asian or Asian/Pacific Islander", "Hispanic", "Black or African American", "White", "Nat. Hawaiian or Other Pacific Isl.", "Two or More Races"],
                          datasets: [{
                              backgroundColor: ["blue", "red", "green", "orange", "purple", "cyan", "yellow"]
                          }]
                      }
                  }
);

// Currency formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

map.on("load", function() {
    function processCountyClick(e) {
        // Update county name
        $("#datapanel-title").html(e.features[0].properties.COUNTY_LAB);

        // Update demographics
        var the_data = county_data[e.features[0].properties.OBJECTID];
        chart.data.datasets[0].data = [the_data["American Indian/Alaska Native Students [Public School] 2019-20"],
                               the_data["Asian or Asian/Pacific Islander Students [Public School] 2019-20"],
                               the_data["Hispanic Students [Public School] 2019-20"],
                               the_data["Black or African American Students [Public School] 2019-20"],
                               the_data["White Students [Public School] 2019-20"],
                               the_data["Nat. Hawaiian or Other Pacific Isl. Students [Public School] 2019-20"],
                               the_data["Two or More Races Students [Public School] 2019-20"]];
        chart.update();

        // Update school funding data
        $("#eq-val").html(formatter.format(the_data["Current Equalized Valuation, 2020"] / the_data["Resident Enrollment"]));
    }

    // When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on("click", "nj-counties-fill", processCountyClick);

    // Change the cursor to a pointer when the mouse is over the counties layer
    map.on("mouseenter", "nj-counties-fill", function () {
        map.getCanvas().style.cursor = "pointer";
    });
    // Change it back to a pointer when it leaves.
    map.on("mouseleave", "nj-counties-fill", function () {
        map.getCanvas().style.cursor = "";
    });
});
