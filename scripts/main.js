var serviceIdVal = [1,2,3];
var directionidVal = [0,1];	
var directionidValLength = directionidVal.length;
var serviceIdValLength = serviceIdVal.length;
var map;
var color = "#FB6E00";
var mapInfo = "";
var mapInfoList = new Array();
var polylineArr = [];
var markerArr = [];
var fulldata = "";
var fulldata16x = "";
var fulldata16nc = "";
var ToSelectStopId = "";
var ToSelectStopName = "";
var ToCurrentStopId = "";
var ToCurrentStopName = "";
var routeStops = [];
var routeSelectedStops = [];
var markerStops =  [];
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
