var serviceIdVal = [1,2,3];
var directionidVal = [0,1];	
var directionidValLength = directionidVal.length;
var serviceIdValLength = serviceIdVal.length;
var map;
var color;

if (data[i].vid > 1699 && data[i].vid < 1800) {
  color = "#007AFB";
}
else if (data[i].vid > 1799 && data[i].vid < 1840) {
  color = "#AF00FB";
}
else if (data[i].vid > 1839 && data[i].vid < 1885) {	
  color = "#FB6E00";
}
else if (data[i].vid > 1884 && data[i].vid < 1965) {	
  color = "#00FBD5";
}
else if (data[i].vid > 1964 && data[i].vid < 1970) {	
  color = "#1300FB";
}
else {
  color = "#FB007E";
}
	
var markerStore1 = {};
var markerStore2 = {};
var markerStore3 = {};
var markerStore4 = {};
var markerStore5 = {};
var markerStore = {};
var currentRouteColor = "";
var infowindow = "";
	
function initMap() {
        map = new google.maps.Map(document.getElementById('googleMap'), {
          center: {lat: 40.73, lng: -73.6},
          zoom: 11.75
        });
	map.data.loadGeoJson('routes.geojson');
	// map.data.loadGeoJson('stops.geojson'); // If we want to show all stops, we can enable this.
}
