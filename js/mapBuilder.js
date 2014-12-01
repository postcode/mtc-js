 var drivealone;
 var geojson;
 var citydata;
 var citysearchdata = [];
 var layersymbols;
 var geocodelayer;


 $(document).ready(function () {
 //CREATE MAP AND ADD BASEMAP LAYER
 var map = L.map('map', {
     center: [37.7833, -122.4167],
     zoom: 10,
     fullscreenControl: true
 });

 // Add ArcGIS Online basemap




 //CREATE SYMBOLOGY FOR MODE LAYERS. SYMBOLOBY UPDATES ON BUTTON CLICK IN MODE MENU

 function getUpdatedColor(name, mode) {
     var d;
     var key;
     switch (mode) {
     case "drivealone":
         for (key in geocitiesdata) {
             if (name === geocitiesdata[key].City) {
                 d = geocitiesdata[key].DrivealoneEstimate;
                 return d > 100 ? '#000' :
                     d > 80 ? '#090991' :
                     d > 60 ? '#1D44B8' :
                     d > 40 ? '#1F83E0' :
                     d > 20 ? '#74B4E8' :

                 '#FFEDA0';
             }
         }
         break;

     case "carpool":
         for (key in geocitiesdata) {
             if (name === geocitiesdata[key].City) {
                 d = geocitiesdata[key].CarpoolEstimate;
                 return d > 30 ? '#000' :
                     d > 20 ? '#090991' :
                     d > 15 ? '#1D44B8' :
                     d > 10 ? '#1F83E0' :
                     d > 5 ? '#74B4E8' :

                 '#FFEDA0';
             }
         }
         break;

     case "publictransit":
         for (key in geocitiesdata) {
             if (name === geocitiesdata[key].City) {
                 d = geocitiesdata[key].PublictransitEstimate;
                 return d > 30 ? '#000' :
                     d > 20 ? '#090991' :
                     d > 15 ? '#1D44B8' :
                     d > 10 ? '#1F83E0' :
                     d > 5 ? '#74B4E8' :

                 '#FFEDA0';
             }
         }
         break;

     case "walk":
         for (key in geocitiesdata) {
             if (name === geocitiesdata[key].City) {
                 d = geocitiesdata[key].WalkEstimate;
                 return d > 20 ? '#000' :
                     d > 15 ? '#090991' :
                     d > 10 ? '#1D44B8' :
                     d > 5 ? '#1F83E0' :
                     d > 1 ? '#74B4E8' :

                 '#FFEDA0';
             }
         }
         break;

     case "bike":
         for (key in geocitiesdata) {
             if (name === geocitiesdata[key].City) {
                 d = geocitiesdata[key].BikeEstimate;
                 return d > 10 ? '#000' :
                     d > 8 ? '#090991' :
                     d > 6 ? '#1D44B8' :
                     d > 4 ? '#1F83E0' :
                     d > 1 ? '#74B4E8' :

                 '#FFEDA0';
             }
         }
         break;

     case "other":
         for (key in geocitiesdata) {
             if (name === geocitiesdata[key].City) {
                 d = geocitiesdata[key].OtherEstimate;
                 return d > 5 ? '#000' :
                     d > 4 ? '#090991' :
                     d > 3 ? '#1D44B8' :
                     d > 2 ? '#1F83E0' :
                     d > 1 ? '#74B4E8' :

                 '#FFEDA0';
             }
         }
         break;

     case "workathome":
         for (key in geocitiesdata) {
             if (name === geocitiesdata[key].City) {
                 d = geocitiesdata[key].WorkathomeEstimate;
                 return d > 20 ? '#000' :
                     d > 15 ? '#090991' :
                     d > 10 ? '#1D44B8' :
                     d > 5 ? '#1F83E0' :
                     d > 1 ? '#74B4E8' :

                 '#FFEDA0';
             }
         }
         break;
     }
 }

 function resetstyle(feature) {

     return {
         fillColor: getUpdatedColor(feature.properties.NAME, layersymbols),
         weight: 2,
         opacity: 1,
         color: 'white',
         dashArray: '3',
         fillOpacity: 0.7
     };
 }

 function updateMapLayers(type) {
     console.log(type);
     geojson.setStyle(resetstyle);
 }



 //CREATE SYMBOLOGY FOR INITIAL LAYER LOAD

 function getColor(d) {
     return d > 1000000 ? '#800026' :
         d > 800000 ? '#BD0026' :
         d > 500000 ? '#E31A1C' :
         d > 350000 ? '#FC4E2A' :
         d > 100000 ? '#FD8D3C' :
         d > 50000 ? '#FEB24C' :
         d > 25000 ? '#FED976' :
         '#FFEDA0';
 }

 function style(feature) {
     return {
         fillColor: getColor(feature.properties.POPULATION),
         weight: 2,
         opacity: 1,
         color: 'white',
         dashArray: '3',
         fillOpacity: 0.7
     };
 }


 function highlightFeature(e) {
     var layer = e.target;

     layer.setStyle({
         weight: 5,
         color: '#666',
         dashArray: '',
         fillOpacity: 0.7
     });

     if (!L.Browser.ie && !L.Browser.opera) {
         layer.bringToFront();
     }
 }

 function resetHighlight(e) {
     geojson.resetStyle(e.target);

 }

 // ZOOM TO FEATURE ON MAP CLICK AND UPDATE CHARTS
 function zoomToFeature(e) {

     var cityname = e.target.feature.properties.NAME;
     console.log(cityname);

     //Dynamically update Shield Charts
     $(this).UpdateChartData(cityname);
     //Zoom to feature
     map.fitBounds(e.target.getBounds());
 }

 //SET PARAMETERS FOR EACH FEATURE AS IT IS INITIALIZED. POPULATE CITY SEARCH ARRAY  
 function onEachFeature(feature, layer) {
     features = feature.properties;
     var bounds = layer.getBounds();
     citysearchdata.push({
         name: features.NAME,
         population: features.POPULATION,
         swbounds: bounds._southWest,
         nebounds: bounds._northEast,
         countyfip: features.COUNTY_FIP,
         county: features.NAME_1

     });

     layer.on({
         mouseover: highlightFeature,
         mouseout: resetHighlight,
         click: zoomToFeature

     });
 }


 //CREATE AND ADD GEOJSON LAYER 

 geojson = L.geoJson(geocities, {
     style: style,
     onEachFeature: onEachFeature
 }).addTo(map);


 //CREATE AND ADD GEOCODE CONTROL
 var geocoder = L.Control.Geocoder.nominatim();
 var control = L.Control.geocoder({
     geocoder: geocoder
 }).addTo(map);


 //CREATE AND ADD LEGEND
 var legend = L.control({
     position: 'bottomright'
 });

 legend.onAdd = function (map) {

     var div = L.DomUtil.create('div', 'info legend'),
         grades = [0, 25000, 50000, 100000, 350000, 500000, 800000, 10000000],
         labels = [];

     // loop through our density intervals and generate a label with a colored square for each interval
     for (var i = 0; i < grades.length; i++) {
         div.innerHTML +=
             '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
             grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
     }

     return div;
 };

 legend.addTo(map);

 //JQUERY FUNCTINO FOR UPDATING CHARTS BASED ON MAP INTERACTION

 $.fn.UpdateChartData = function (searchcity) {

     // Line Chart Data
     for (var key in geocitiesdata) {
         var updatecity = geocitiesdata[key].City;
         var drivealone = geocitiesdata[key].DrivealoneEstimate;
         var publictransit = geocitiesdata[key].PublictransitEstimate;
         var carpool = geocitiesdata[key].CarpoolEstimate;
         var walk = geocitiesdata[key].WalkEstimate;
         var other = geocitiesdata[key].OtherEstimate;
         var workhome = geocitiesdata[key].WorkathomeEstimate;
         var bike = geocitiesdata[key].BikeEstimate;

         if (updatecity === searchcity) {
             console.log("match");
             $('#chart1').highcharts({
                 chart: {
                     type: 'bar'
                 },
                 title: {
                     text: searchcity
                 },

                 xAxis: {
                     categories: ['Drive Alone', 'Public Transit', 'Carpool', 'Walk', 'Work at Home'],
                     title: {
                         text: null
                     }
                 },
                 yAxis: {
                     min: 0,
                     title: {
                         text: 'Estimate',
                         align: 'high'
                     },
                     labels: {
                         overflow: 'justify'
                     }
                 },
                 colors: ['#1a74dd', '#e88017', '#6bd855', '#de38e5', '#1595b4',
                            '#b46f11', '#7a0ea2', '#8085e8', '#8d4653', '#91e8e1'
                        ],

                 plotOptions: {

                     bar: {
                         pointWidth: 50,
                         colorByPoint: true,
                         dataLabels: {
                             enabled: true
                         }
                     }
                 },
                 legend: {
                     layout: 'vertical',
                     align: 'right',
                     verticalAlign: 'top',
                     x: -40,
                     y: 100,
                     floating: true,
                     borderWidth: 1,
                     backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor || '#FFFFFF'),
                     shadow: true
                 },
                 credits: {
                     enabled: false
                 },
                 series: [{
                     name: 'San Francisco',
                     data: [drivealone, publictransit, carpool, walk, other, bike]
                        }]

             });

         }
     }
 };

 //ZOOM TO CITY AND UPDATE CHARTS FUNCTION BASED ON COMBOBOX 
 function zoomtoCity(cty) {
     var zoomcity = cty;

     if (zoomcity === "") {
         map.setView([37.7833, -122.4167], 9);
     }
     var features = citysearchdata;

     for (var key in features) {
         city = features[key].name;

         if (city === zoomcity) {

             map.fitBounds([features[key].swbounds, features[key].nebounds]);
             //Dynamically update Shield Charts
             $(this).UpdateChartData(zoomcity);
         } else {

         }
     }
   }
 })