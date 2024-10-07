let earthquacke_data_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// create a new map using leaflet
var newMap = L.map("map").setView([37.09, -95.71], 4);

// map type / map interface
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(newMap);


function getMarkerColor(depth) { // third parameter from coordinates object
    if (depth > 90) return "#ff3333";
    else if (depth > 70) return "#ff6633";
    else if (depth > 50) return "#ff9933";
    else if (depth > 30) return "#ffcc33";
    else if (depth > 10) return "#ffff33";
    else return "#ccff33";
}

// fetch the earthquake data and dsipaly on the map
d3.json(earthquacke_data_url).then(function (data) {
    // create the marker layer
    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            // circle marker for each earthquake
            return L.circleMarker(latlng, {
                radius: feature.properties.mag,
                fillColor: getMarkerColor(feature.geometry.coordinates[2]),
                fillOpacity: 0.8,
                color: "#000",
                weight: 0.1
            })
        },
        // pop up on each marker
        onEachFeature: function (feature, layer) {
            layer.bindPopup(`<h4>${feature.properties.place}</h4>
                <p>Magnitude: ${feature.properties.mag}</p>
                <p>Depth: ${feature.geometry.coordinates[2]}`);
        }
    }).addTo(earthquakes);

    earthquakes.addTo(newMap);

    // creating legend
    let legend = L.control({ position: 'bottomright' });
    // add a legend bar/a tag that would represent the legend
    legend.onAdd = function (map) {
        let e = L.DomUtil.create('div', 'info_legend');
        depths = [-10, 10, 30, 50, 70, 90];

        // if else , condition ? true call : false calls
        for (let i = 0; i < depths.length; i++) {
            console.log(getMarkerColor(depths[i]))
            e.innerHTML += '<p>' + '<span style="display: inline-block; width: 12px !important; height: 12px !important; background: ' + getMarkerColor(depths[i]) + '"></span>'
                + "<span style='margin-left: 20px;'>" + depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] : '+') + '</span></p>';
        }
        return e;
    }

    legend.addTo(newMap);
})
