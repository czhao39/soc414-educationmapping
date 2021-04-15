mapboxgl.accessToken = "pk.eyJ1IjoiaGN6aGFvIiwiYSI6ImNrbWszcTFqMTB4ZTYycG11Ynlyb3UxNzUifQ.JuA7bKyFv7GUstkueJx0gA"

var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/hczhao/ckn2n2gs637qy17mxjrx3v1fm",
    center: [-74, 40],
    zoom: 7
});

map.on("load", function () {
    function processDistrictClick(e) {
        $("#datapanel-title").html(e.features[0].properties.NAME);
        //new mapboxgl.Popup()
        //    .setLngLat(e.lngLat)
        //    .setHTML(e.features[0].properties.NAME)
        //    .addTo(map);
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
