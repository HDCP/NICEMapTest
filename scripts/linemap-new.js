jQuery(document).ready(function () { 

       initMap();

       var routeVal0 = ["MMCS","ElFx","n1","n4","n4X","n6","n6X","n15",
		      "n16","n19","n20G","n20H","n21","n22","n22X","n23","n24","n25","n26",
		      "n27","n31","n32","n33","n35","n40_41","n43","n48","n49","n54",
		      "n55","n57","n58","n70","n71","n72","n78","n79","n80"];
       var serviceIdVal = [1,2,3];
       var directionidVal = [0,1];
	
       var routeValLength = routeVal0.length;
       var directionidValLength = directionidVal.length;
       var serviceIdValLength = serviceIdVal.length;
	
       for (var i = 0; i < routeValLength; i++) {
	var routeVal = routeVal0.toString();
	var route_val = routeVal[i];	
	       getVehicles("#"+fulldata.Line[route_val].color);
	       setTimeout(function(){
		 getVehicles("#"+fulldata.Line[route_val].color);  
	       },5000);
	       setInterval(function() {
		 getVehicles("#"+fulldata.Line[route_val].color);
	       }, 15000);
       }
  });

    var map;
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
      }    

function getVehicles(color) {
  var routeId = route_val;
  var methodName = "getrealtime";
  // var url = window.location.origin + "/NICECustomPages/getjsondata.aspx?getData=" + methodName + "&route_id="+ routeId;
  var url = "http://www.nicebus.com/NICECustomPages/getjsondata.aspx?getData=" + methodName + "&route_id="+ routeId;
  jQuery.ajax({
       type: "GET",
       url: url,
       cache: false,
       contentType: "application/json",
       dataType: "json",
       success: function (response)
       {
          var data = response.ResultData;
          // var icon = window.location.origin + "/App_Themes/Default/Images/DocumentTypeIcons/RealTime-Inner-bus-lines.png";
          // var outer_icon = window.location.origin + "/App_Themes/Default/Images/DocumentTypeIcons/RealTime-Outer.svg";
	  var icon = window.location.origin + "/NICEMap/images/RealTime-Inner-bus-lines.png";
          var outer_icon = window.location.origin + "/NICEMap/images/RealTime-Outer.svg";
          var marker, point;
          if(Object.keys(markerStore).length > (data.length * 2)) {
            var objArr = Object.keys(markerStore);
            for(var i=0; i< objArr.length; i++) {
              var selectedMarker = jQuery.map(data, function(val, index){
               if( String(objArr[i]) ==  String(val.vid + "1111") || String(objArr[i]) ==  String(val.vid + "2222")){
                 return index;
               }
              });
              if(selectedMarker.length == 0) {
                markerStore[objArr[i]].setMap(null);
              }
            }
          }
         
          if(data.length > 0 && data[0].lat != "") {
           for (var i=0; i< data.length; i++) {
            point = new google.maps.LatLng({lat: parseFloat(data[i].lat), lng: parseFloat(data[i].lon)})
             
            var baseIcon = {
              url: icon + '#' + data[i].vid,
              size: new google.maps.Size(42, 42),
              anchor: new google.maps.Point(22,22),
              scale: 1,
              strokeWeight: 1
            }
                
            function rotateMarker(selector, degree){
              // var ImgURL= window.location.origin + "/App_Themes/Default/Images/DocumentTypeIcons/RealTime-Outer.png";                  
             var ImgURL= window.location.origin + "/NICEMap/images/RealTime-Outer.png";
	      jQuery('img[src="'+ImgURL+'#'+selector+'"]').css({
               'transform': 'rotate('+degree+'deg)'
             });
            }
              
            function colorMarker(selector){
              jQuery('img[src="'+ icon +'#'+selector+'"]').css({
                'background-color': color,
                'width': '42px',
                'height': '42px',
                'min-height': '42px',
                'border-radius':'100%'
              });
            }
              
            var outerIcon = {
              // url: window.location.origin +'/App_Themes/Default/Images/DocumentTypeIcons/RealTime-Outer.png#' + data[i].vid,
              url: window.location.origin +'/NICEMap/images/RealTime-Outer.png#' + data[i].vid,
	      scale: 1,
              anchor: new google.maps.Point(35,35),
              strokeWeight: 1
            }
            
            if(markerStore.hasOwnProperty(data[i].vid + 1111)) {
              markerStore[data[i].vid + 2222].setIcon(outerIcon);
              
              markerStore[data[i].vid + 1111].animateTo(point,{  easing: "linear",
                                 duration: 10000
                              });
              markerStore[data[i].vid + 2222].animateTo(point,{  easing: "linear",
                                 duration: 10000
                              });
              
            } else {
              marker = new google.maps.Marker({
                position: point,
                map: map,
                icon: baseIcon,
                title: data[i].vid + 1111,
                zIndex: 9999 + i,
                optimized: false
              }); 
              markerStore[data[i].vid + 1111] = marker;
              marker = new google.maps.Marker({
                position: point,
                map: map,
                icon: outerIcon,
                title: data[i].vid + 2222,
                zIndex: 9999 + i,
                optimized: false
              }); 
              markerStore[data[i].vid + 2222] = marker;              
            }
            rotateMarker(data[i].vid, Number(Number(data[i].hdg)));
            colorMarker(data[i].vid);
          }
          for (var i=0; i< data.length; i++) {
            function rotateMarker(selector, degree){
              // var ImgURL= window.location.origin + "/App_Themes/Default/Images/DocumentTypeIcons/RealTime-Outer.png"; 
	      var ImgURL= window.location.origin + "/NICEMap/images/RealTime-Outer.png";
             jQuery('img[src="'+ImgURL+'#'+selector+'"]').css({
               'transform': 'rotate('+degree+'deg)'
             });
            }
            function colorMarker(selector){
              jQuery('img[src="'+ icon +'#'+selector+'"]').css({
                'background-color': color,
                'width': '42px',
                'height': '42px',
                'min-height': '42px',
                'border-radius':'100%'
              });
            }
            rotateMarker(data[i].vid, Number(Number(data[i].hdg)));
            colorMarker(data[i].vid);
          }
         }
       },
       error: function (jqXHR, textStatus, errorThrown)
       {
         console.log(errorThrown);
       }
   }); 
}
