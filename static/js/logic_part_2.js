

// Add your Mapbox access token
var accessToken = "pk.eyJ1IjoibnVrdXgiLCJhIjoiY2xlZmc2MjIyMDRuZDQxbjA4cG5uZGN0dyJ9.a_bbaRA4nF6MDF6ekWwh1g";

// leaflet -> is a map rendering engin
// mapbox -> has number of different map visualization layers
// Define base layers (Satellite, Grayscale, Outdoors) using Mapbox.
var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-v9/tiles/{z}/{x}/{y}?access_token=" + accessToken, {
  attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
});

var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=" + accessToken, {
  attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
});

var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/tiles/{z}/{x}/{y}?access_token=" + accessToken, {
  attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">Mapbox</a> contributors'
});

// data layers
var earthquakes = new L.LayerGroup();
var tectonicPlates = new L.LayerGroup();

var mapLayers= {
    "Satellite": satellite,
    "Grayscale": grayscale,
    "Outdoors": outdoors,
}

// earthquakes and tectonics datasets
var mapDatasets = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": tectonicPlates
}

L.control.layers(mapLayers, mapDatasets).addTo(newMap);

// fetch the tectonics dataset
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/refs/heads/master/GeoJSON/PB2002_boundaries.json").then(function(plateData){
    L.geoJson(plateData, {
        color: "orange", 
        weight: 2
    }).addTo(tectonicPlates);

    tectonicPlates.addTo(newMap);
})



