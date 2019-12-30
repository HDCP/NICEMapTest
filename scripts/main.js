var serviceIdVal = [1,2,3];
var directionidVal = [0,1];	
var directionidValLength = directionidVal.length;
var serviceIdValLength = serviceIdVal.length;
var map;
var color = "#FB6E00";

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
