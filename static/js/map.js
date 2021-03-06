mapboxgl.accessToken = "pk.eyJ1IjoiaGN6aGFvIiwiYSI6ImNrbWszcTFqMTB4ZTYycG11Ynlyb3UxNzUifQ.JuA7bKyFv7GUstkueJx0gA";

var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/hczhao/ckn2n2gs637qy17mxjrx3v1fm",
    center: [-74.7, 40],
    zoom: 7.5
});

$.getJSON("/json/school_data_NJPP.json", function(data) {
    school_data = data;
    console.log(school_data["3400004"]);
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
    function processDistrictClick(e) {
        // Update district name
        $("#datapanel-title").html(e.features[0].properties.NAME);

        // Update demographics
        var the_data = school_data[e.features[0].properties.GEOID];
        chart.data.datasets[0].data = [the_data["American Indian/Alaska Native Students [District] 2016-17"],
                               the_data["Asian or Asian/Pacific Islander Students [District] 2016-17"],
                               the_data["Hispanic Students [District] 2016-17"],
                               the_data["Black or African American Students [District] 2016-17"],
                               the_data["White Students [District] 2016-17"],
                               the_data["Nat. Hawaiian or Other Pacific Isl. Students [District] 2016-17"],
                               the_data["Two or More Races Students [District] 2016-17"]];
        chart.update();

        // Update school funding data
        $("#eq-val").html(formatter.format(the_data["Current Equalized Valuation, 2020"] / the_data["Resident Enrollment"]));
        $("#state-rev").html(formatter.format(the_data["Total Revenue - State Sources (TSTREV) per Pupil (V33) [District Finance] 2016-17"]));
        $("#local-rev").html(formatter.format(the_data["Total Revenue - Local Sources (TLOCREV) per Pupil (V33) [District Finance] 2016-17"]));
    }

    // When a click event occurs on a feature in the states layer, open a popup at the
    // location of the click, with description HTML from its properties.
    map.on("click", "2020-us-sdu-fill", processDistrictClick);
    map.on("click", "2020-us-sde-fill", processDistrictClick);
    map.on("click", "2020-us-sds-fill", processDistrictClick);

    // // Change the cursor to a pointer when the mouse is over the states layer.
    // map.on("mouseenter", "2020-us-sdu-fill", function () {
    //     map.getCanvas().style.cursor = "pointer";
    // });
    // map.on("mouseenter", "2020-us-sde-fill", function () {
    //     map.getCanvas().style.cursor = "pointer";
    // });
    // map.on("mouseenter", "2020-us-sds-fill", function () {
    //     map.getCanvas().style.cursor = "pointer";
    // });

    // // Change it back to a pointer when it leaves.
    // map.on("mouseleave", "2020-us-sdu-fill", function () {
    //     map.getCanvas().style.cursor = "";
    // });
    // map.on("mouseleave", "2020-us-sde-fill", function () {
    //     map.getCanvas().style.cursor = "";
    // });
    // map.on("mouseleave", "2020-us-sds-fill", function () {
    //     map.getCanvas().style.cursor = "";
    // });
});
