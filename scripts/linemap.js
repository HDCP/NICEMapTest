jQuery(document).ready(function () { 

       initMap();
       // initial_population(); 
       RefreshMapData();
       var route_val = jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnCurrentRouteCode").val();
       getVehicles("#"+fulldata.Line[route_val].color);
       setTimeout(function(){
         getVehicles("#"+fulldata.Line[route_val].color);  
       },5000);
       setInterval(function() {
         getVehicles("#"+fulldata.Line[route_val].color);
       }, 15000);
       getETA(false);   
       setInterval(function() {
         getETA(false);
       }, 30000);
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

    function initial_population() {        
        fulldata = jQuery.parseJSON(jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnData").val());         
      if(jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnData16x").val()!="")
            fulldata16x=jQuery.parseJSON(jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnData16x").val());
        if(jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnData16nc").val()!="")
            fulldata16nc=jQuery.parseJSON(jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnData16nc").val());
    }  
function closeRouteSectionLineMap() {
	jQuery('body').removeClass('routes-list-open');
  jQuery("#routescontainerLineMap").slideUp("slow");
  jQuery(".routes-list-bottom").slideUp("slow");
  jQuery("#a_switch").attr("disabled", false);
  jQuery("#a_switch").css("background-color", "#002d56");
  
}
/* function switchToRoute() {
  jQuery('body').addClass('routes-list-open');
  jQuery("#routescontainerLineMap").slideDown("slow",function(){
	console.log(jQuery(window).innerHeight());
	console.log(jQuery('#routecontentLineMap').offset().top);
	console.log(jQuery('#routes-search-box.routesearchboxwrap').outerHeight());
	jQuery('.sticky').css('bottom','0px');
	var routewrapperheight = jQuery(window).innerHeight() - jQuery('#routecontentLineMap').offset().top - jQuery('#routes-search-box.routesearchboxwrap').outerHeight();
	
	jQuery('#routecontentLineMap').css({'height': routewrapperheight, 'overflow-y':'scroll'});
	
  });
  jQuery(".routes-list-bottom").slideDown("slow");
  
  jQuery("#a_switch").attr("disabled", true);
  jQuery("#a_switch").css("background-color", "#a3a2a2");
  
} 

function changeCheckboxLineMap(that) {
  if (jQuery(that).is(":checked")) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPositiondata, showError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
   } else {
        // var url = window.location.origin + "/NICECustomPages/getjsondata.aspx?getData=allroutes";
        var url = "http://www.nicebus.com/NICECustomPages/getjsondata.aspx?getData=allroutes";
	getRoutesDataLineMap(url);
   }
}

function getRoutesDataLineMap(url) {
    jQuery.ajax({
        type: "GET",
        url: url,
		contentType: "application/json",
        dataType: "json",
        success: function (response) {
            jQuery("#routecontentLineMap").html(response.ResultData[0].HtmlContent);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });
}

function searchRoutesLineMap() {
  // var url = window.location.origin + "/NICECustomPages/getjsondata.aspx?getData=filterroutebyname&name=" + jQuery("#txt_searchRouteLineMap").val();
  var url = "http://www.nicebus.com/NICECustomPages/getjsondata.aspx?getData=filterroutebyname&name=" + jQuery("#txt_searchRouteLineMap").val();	
  jQuery.ajax({
        type: "GET",
        url: url,
		contentType: "application/json",
        dataType: "json",
        success: function (response) {
            jQuery("#routecontentLineMap").html(response.ResultData[0].HtmlContent);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
  });
}

function showPositiondata(position) {
    // var url = window.location.origin + "\NICECustomPages\getnearbylines?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&buffer=1";
    var url = "http://www.nicebus.com\NICECustomPages\getnearbylines?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&buffer=1";
    getRoutesDataLineMap(url);
} */

function RefreshMapData() {
         infowindow = new google.maps.InfoWindow();
         var latlngbounds = new google.maps.LatLngBounds();
         var longlat = [];
         var markerLatLong = [];
         var stopCode = [];
         var stopName = [];
         var routeListStrArray = [];
         // var routeVal=jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnCurrentRouteCode").val();
	 var routeVal= ["MMCS,ElFx,n1,n4,n4X,n6,n6X,n15","n16","n19,n20G,n20H,n21,n22,n22X,n23,n24,n25,n26","n27,n31,n32,n33,n35,n40_41,n43,n48,n49,n54","n55,n57,n58,n70,n71,n72,n78,n79,n80"];
         var serviceIdVal=jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnCurrentServiceId").val();
         var directionidVal=jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnCurrentDirection").val();
         var TimingPointStopsData=jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnStopsData").val();
         if(serviceIdVal =="1" && directionidVal=="0")
           {
             latLongList = fulldata.Line[routeVal].latlongListWeeKday;
           }
           else if(serviceIdVal =="2" && directionidVal=="0")
           {
            latLongList = fulldata.Line[routeVal].latlongListSatday;
           }
           else if(serviceIdVal =="3" && directionidVal=="0")
           {
            latLongList = fulldata.Line[routeVal].latlongListSunday;
           }
           else  if(serviceIdVal =="1" && directionidVal=="1")
           {
            latLongList = fulldata.Line[routeVal].latlongListOutboundWeekday;
           }
           else if(serviceIdVal =="2" && directionidVal=="1")
           {
             latLongList = fulldata.Line[routeVal].latlongListOutboundSatday;
           }
           else if(serviceIdVal =="3" && directionidVal=="1")
           {
            latLongList = fulldata.Line[routeVal].latlongListOutboundSunday;
           }
       
           for (index = 0; index < latLongList.length; index++) {
             var latLongPtList = latLongList[index];
             var longlat = [];
               for (i = 0; i < latLongPtList.length; i++) {
                    var entry = latLongPtList[i];
                    latVal = entry.latitide;
                    longVal = entry.longitude;
                    longlat.push(new google.maps.LatLng({lat: parseFloat(latVal), lng: parseFloat(longVal)}));
                    latlngbounds.extend(new google.maps.LatLng({lat: parseFloat(latVal), lng: parseFloat(longVal)}));
                } 
                currentRouteColor = "#"+fulldata.Line[routeVal].color;
                var polyline = new google.maps.Polyline({ path: longlat, 
                                                     geodesic: true, 
                                                     strokeColor: currentRouteColor, 
                                                     strokeOpacity: fulldata.Line[routeVal].opacity, 
                                                     strokeWeight: fulldata.Line[routeVal].width
                                                  });
                
                polyline.setMap(map);
                polylineArr.push(polyline);           
             }

        if(routeVal=="n16")
          {
            // Draw line for N16NC route
              latLongList=[];
              if(directionidVal=="0")
               {
                 latLongList = fulldata16nc.Line["n16NC"].latlongListWeeKday;
               }
               else if(directionidVal=="1")
                {
                   latLongList = fulldata16nc.Line["n16NC"].latlongListOutboundWeekday;
                }
                 for (index = 0; index < latLongList.length; index++) {
                       var latLongPtList = latLongList[index];
                       var longlat = [];
                       for (i = 0; i < latLongPtList.length; i++) {
                            var entry = latLongPtList[i];
                            latVal = entry.latitide;
                            longVal = entry.longitude;
                            longlat.push(new google.maps.LatLng({lat: parseFloat(latVal), lng: parseFloat(longVal)}));
                            latlngbounds.extend(new google.maps.LatLng({lat: parseFloat(latVal), lng: parseFloat(longVal)}));
                        } 
                        
                        var polyline = new google.maps.Polyline({ path: longlat, 
                                                             geodesic: true, 
                                                             strokeColor: currentRouteColor, 
                                                             strokeOpacity: fulldata.Line[routeVal].opacity, 
                                                             strokeWeight: fulldata.Line[routeVal].width
                                                          });
                        polyline.setMap(map);
                        polylineArr.push(polyline);   
                   }
            // Draw line for N16x route
              latLongList=[];
              if(directionidVal=="0")
               {
                 latLongList = fulldata16x.Line["n16X"].latlongListWeeKday;
               }
               else if(directionidVal=="1")
                {
                   latLongList = fulldata16x.Line["n16X"].latlongListOutboundWeekday;
                }
                 for (index = 0; index < latLongList.length; index++) {
                       var latLongPtList = latLongList[index];
                       var longlat = [];
                       for (i = 0; i < latLongPtList.length; i++) {
                            var entry = latLongPtList[i];
                            latVal = entry.latitide;
                            longVal = entry.longitude;
                            longlat.push(new google.maps.LatLng({lat: parseFloat(latVal), lng: parseFloat(longVal)}));
                            latlngbounds.extend(new google.maps.LatLng({lat: parseFloat(latVal), lng: parseFloat(longVal)}));
                        } 
                        
                        var polyline = new google.maps.Polyline({ path: longlat, 
                                                             geodesic: true, 
                                                             strokeColor: currentRouteColor, 
                                                             strokeOpacity: fulldata.Line[routeVal].opacity, 
                                                             strokeWeight: fulldata.Line[routeVal].width
                                                          });
                        polyline.setMap(map);
                        polylineArr.push(polyline);   
                   }
 
          }
     
         
                map.setCenter(latlngbounds.getCenter());
                map.fitBounds(latlngbounds);
                map.setMapTypeId('roadmap');
  
                //Timing Point Stops
               var Stopsdata = jQuery.parseJSON(jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnStopsData").val());         
               routeSelectedStops = Stopsdata;
               //ToCurrentStopId = Stopsdata[0].stopid;
               //ToCurrentStopName = Stopsdata[0].stopname;
               getETA();
                for (stopIndex=0;stopIndex <Stopsdata.length;stopIndex++)
                 {
                    var entry = Stopsdata[stopIndex];
                    latVal = entry.latitide;
                    longVal = entry.longitude;
                    markerLatLong[markerLatLong.length] = new google.maps.LatLng(latVal, longVal);
                    stopCode[stopCode.length] = entry.stopid;
                    stopName[stopName.length] = entry.stopname;
                    routeListStrArray[routeListStrArray.length] = entry.routeListStr;
                 }
              getStops();
    }

function getStops() {
  
   var methodName = "getStops";
   var routeID = jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnCurrentRouteId").val();
   var directionidVal=jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnCurrentDirection").val();
   var ServiceidVal=jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnCurrentServiceId").val();
   // var url = window.location.origin + "/NICECustomPages/getjsondata.aspx?getData=" + methodName + "&route_id="+ routeID +"&direction_id=" + directionidVal+"&service_id=" + ServiceidVal;
   var url = "http://www.nicebus.com/NICECustomPages/getjsondata.aspx?getData=" + methodName + "&route_id="+ routeID +"&direction_id=" + directionidVal+"&service_id=" + ServiceidVal;
	
  jQuery.ajax({
       type: "GET",
       url: url,
       cache: false,
       contentType: "application/json; charset=utf-8",
       dataType: "json",
       success: function (response)
       {
          markerStops =  [];
          var data = [];
          routeStops = response.ResultData;
         for(i=0;i< response.ResultData.length; i++) {
            var obj = { label: response.ResultData[i].Display, value: response.ResultData[i].Value };
            data.push(obj);
          }
          
          jQuery("#txt_route").autocomplete({
            source: data,
            focus: function (event, ui) {
                event.preventDefault();
               jQuery(this).val("Stop #" + ui.item.value + ", " + ui.item.label);
            },
            select: function (e, i) {
                e.preventDefault();
                ToSelectStopId = i.item.value;
                ToSelectStopName = i.item.label;
                jQuery(this).val("Stop #" + i.item.value + ", " + i.item.label);
            },
            minLength: 1
        });
        displayStopsOnMap();
       },   
       error: function (jqXHR, textStatus, errorThrown)
       {
         console.log(errorThrown);
       }
   });
 }

function getETA() {
   var methodName = "getETA";
   var shortRouteName = jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnCurrentRouteCode").val();
   var stopId = ToCurrentStopId;
   var stopName = ToCurrentStopName;
   //if(showloading) {
   //  showLoading();
   //}
   if(stopId != "" && stopName != "") 
   {
     // var url = window.location.origin + "/NICECustomPages/getjsondata.aspx?getData=" + methodName + "&route_id="+ shortRouteName +"&stop_id=" + stopId + "&stop_name=" + stopName;
     var url = "http://www.nicebus.com/NICECustomPages/getjsondata.aspx?getData=" + methodName + "&route_id="+ shortRouteName +"&stop_id=" + stopId + "&stop_name=" + stopName;
      jQuery.ajax({
         type: "GET",
         url: url,
         cache: false,
         contentType: "application/json; charset=utf-8",
         dataType: "json",
         success: function (response)
         {
              var data = response.ResultData[0];
              var val1 = data.ETA1.split('|');
              var time1 = val1[0].split(' ');
              
              if(data.ETA1 != "")
              {
                if(val1[1] == 'R') {
                  if(time1.length > 1) 
		      // Original Image location: /NICE/media/assets/img/nice-real-time.gif 
                      jQuery("#sp_nextbusin").html(time1[0] + '<span class="unit">'+ time1[1] +' <img src="/images/nice-real-time.gif" class="realtime" /> </span>');
                  else 
                     jQuery("#sp_nextbusin").html(time1[0] + '<span class="unit"> &nbsp; <img src="/images/nice-real-time.gif" class="realtime" /> </span>');
                  } else {
                  if(time1.length > 1) 
                   jQuery("#sp_nextbusin").html(time1[0] + '<span class="unit">'+ time1[1] +' </span>');
                  else
                    jQuery("#sp_nextbusin").html(time1[0]);
                }
              }
              if(data.ETA2 != "")
              {
                var val2 = data.ETA2.split('|');
                var time2 = val2[0].split(' ');
                if(val2[1] == 'R'){
                  if(time2.length > 1)
                    jQuery("#sp_followingbusin").html(time2[0] + '<span class="unit">'+ time2[1] +' <img src="/images/nice-real-time.gif" class="realtime" /> </span>');
                  else 
                    jQuery("#sp_followingbusin").html(time2[0] + '<span class="unit"> &nbsp; <img src="/images/nice-real-time.gif" class="realtime" /> </span>');
                } else {
                  if(time2.length > 1)
                   jQuery("#sp_followingbusin").html(time2[0] + '<span class="unit">'+ time2[1] +' </span>');
                  else
                    jQuery("#sp_followingbusin").html(time2[0]);
                }
              }
              if(data.ETA3 != "")
              {
                var val3 = data.ETA3.split('|');
                var time3 = val3[0].split(' ');
                if(val3[1] == 'R'){
                  if(time3.length > 1)
                    jQuery("#sp_scheduledbusafter").html(time3[0] + '<span class="unit">'+ time3[1] +' <img src="/images/nice-real-time.gif" class="realtime" /> </span>');
                  else
                    jQuery("#sp_scheduledbusafter").html(time3[0] + '<span class="unit"> &nbsp; <img src="/images/nice-real-time.gif" class="realtime" /> </span>');
                } else {
                  if(time3.length > 1)
                   jQuery("#sp_scheduledbusafter").html(time3[0] + '<span class="unit">'+ time3[1] +' </span>');
                  else
                   jQuery("#sp_scheduledbusafter").html(time3[0]);
                }
              }
              //$("#sp_currentstop").html(data.stopname + '<span><i>Stop #' + data.stopid + '</i></span>');
              //checkForSelectedDirection(); 
              //if(showloading) {
              //  hideLoading();
              //}
         },
         error: function (jqXHR, textStatus, errorThrown)
         {
           //if(showloading) {
           //  hideLoading();
           //}
           console.log(errorThrown);
         }
     });
   }
 }

function calDistance(lat1, lon1, lat2, lon2) {
	var radlat1 = Math.PI * lat1/180
	var radlat2 = Math.PI * lat2/180
	var theta = lon1-lon2
	var radtheta = Math.PI * theta/180
	var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
	dist = Math.acos(dist)
	dist = dist * 180/Math.PI
	dist = dist * 60 * 1.1515
	return dist * 0.8684;
}

function displayStopsOnMap(currentLat, currentLng) {
          
          var marker, i, label, j;
          var currentStopId = "";
          var currentStop = "";
          for(j=0; j < markerStops.length; j++) {
            markerStops[j].setMap(null);
          }
          markerStops = [];
          //userPosition = new google.maps.LatLng(29.967495, -90.0915052); 
          if(currentLat != "" && currentLng != "" && currentLat != undefined && currentLng != undefined) {
            var preDiff = 0;
             for(i=0;i< routeStops.length; i++) {
              var diff = calDistance(currentLat,currentLng,routeStops[i].lat,routeStops[i].lng);
              if(preDiff == 0 || preDiff > diff) {
                preDiff = diff;
                currentStopId = routeStops[i].Value;
                currentStop = routeStops[i].Display;
              }
            }
            ToCurrentStopId = currentStopId;
            ToCurrentStopName = currentStop;
            
            //$("#sp_currentstop").html(currentStop + '<span><i>Stop #' + currentStopId + '</i></span>');
            getETA(true);
          }
          //if($('#chk_mylocation').prop("checked")) {
          //   $("#txt_route").val($("#p_lt_ctl05_PagePlaceholder_p_lt_CMSWebPartZone21_CustomIndividualLineMap_hdnCurrentStopName").val());
          //  }
          for(i=0;i< routeStops.length; i++) {
            var isStopMarker = true;
            var isCurrent = false;
            var code = ToCurrentStopId;
            if(code == routeStops[i].Value) {
              isCurrent = true;
            }
            var point = new google.maps.LatLng(parseFloat(routeStops[i].lat), parseFloat(routeStops[i].lng));
            var baseIcon = {
              path: google.maps.SymbolPath.CIRCLE,
              strokeColor: currentRouteColor,
              fillColor: isCurrent ? currentRouteColor : '#FFF',
              anchor: new google.maps.Point(0,0),
              scale: 3.5,
              labelOrigin: new google.maps.Point(0, 0),
              fillOpacity: 1
            }
            //var selectedStop = routeSelectedStops.find(x=> x.stopCode == routeStops[i].Value);
            var selectedStop = jQuery.map(routeSelectedStops, function(val, index){
              if(val.stopid == routeStops[i].Value){
                return index;
              }
            });
            if(selectedStop.length > 0) {
                   isStopMarker = false;
                   var abcd = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";    
                   label = abcd[selectedStop[0]];
                   baseIcon = {
                     path: google.maps.SymbolPath.CIRCLE,
                     strokeColor: currentRouteColor,
                     strokeWeight: 4,
                     fillColor: '#FFF',
                     anchor: new google.maps.Point(0,0),
                     scale: 10,
                     labelOrigin: new google.maps.Point(0, 0),
                     fillOpacity: 1
                   }
            }
            var shortRouteName = jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnCurrentRouteCode").val();
            var className = "route_" + shortRouteName;
            myHtml = "<div><span class='stop_heading stop_heading_new'><b>Stop #</b>" + routeStops[i].Value + "</span><br/><span style='font-size:11px' class='stop_head_new'>" + routeStops[i].Display + "</span></div>";   
            
            if(isStopMarker) {
              marker = new google.maps.Marker({
                position: point,
                map: map,
                icon: baseIcon,
                title: routeStops[i].Value
              });
              markerStops.push(marker);  
            } else {
              marker = new google.maps.Marker({
                position: point,
                map: map,
                icon: baseIcon,
                label: {
                  text: label,
                  color: currentRouteColor,
                  scale: 0.25
                },
                zIndex: 999,
                title: routeStops[i].Value
              });
            }
            
           
            var fillIcon = {
                  path: google.maps.SymbolPath.CIRCLE,
                  strokeColor: currentRouteColor,
                  fillColor: currentRouteColor,
                  anchor: new google.maps.Point(0,0),
                  scale: 3.5,
                  fillOpacity: 5
            }
            var mainIcon = {
                path: google.maps.SymbolPath.CIRCLE,
                strokeColor: currentRouteColor,
                fillColor: "#FFF",
                anchor: new google.maps.Point(0,0),
                scale: 3.5,
                fillOpacity: 5
            }
            
            google.maps.event.addListener(marker, 'click', (function(marker,myHtml,infowindow) {
             return function() {
                infowindow.setContent(myHtml);
                infowindow.open(map, marker);
                for(var j=0; j< markerStops.length; j++) {
                  markerStops[j].setIcon(mainIcon);
                }
                var code = jQuery(infowindow.content).find('.stop_heading').text();
                var name = jQuery(infowindow.content).find('.stop_head_new').text();
               
                for(j=0;j< routeStops.length; j++) {
                  if(code.indexOf(routeStops[j].Value) > -1 && routeStops[j].Display == name) {
                    setCurrentStop(routeStops[j].Value,routeStops[j].Display);
                  }
                  var selectedStop = jQuery.map(routeSelectedStops, function(val, index){
                    if(val.stopid == routeStops[j].Value) {
                      return index;
                    }
                  });
                  if(code.indexOf(routeStops[j].Value) > -1 && routeStops[j].Display == name && selectedStop.length <= 0) {
                    marker.setIcon(fillIcon);    
                  }
                }
             }
            })(marker,myHtml,infowindow));
         }
          
          google.maps.event.addListener(map, 'click', function(event) {
              infowindow.close();
          });
       
          google.maps.event.addListener(infowindow, 'domready', function() {
             var iwOuter = jQuery('.gm-style-iw');
            
             var iwBackground = iwOuter.prev();
             iwBackground.children(':nth-child(1)').css({'display' : 'none'});
             iwBackground.children(':nth-child(2)').css({'display' : 'none'});
             iwBackground.children(':nth-child(4)').css({'display' : 'none'});  
            
             iwBackground.css({'top' : '15px'});
             iwOuter.css({'padding': '10px', 'background-color' : "'" + currentRouteColor + "'", 'border-radius' :'50px','color':'white', 
                          'box-shadow': '5px 6px 10px rgba(0, 0, 0, 0.75)', 'border' : '2px solid white',
                         'text-align': 'center', 'margin-top': '22px', 'max-width': '225px'});
             
             iwOuter.children(':nth-child(1)').css({'width' : '100%'});
             iwOuter.children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(1)').children(':nth-child(1)').find('span').css({'color': "'" + currentRouteColor + "!important;'"});
            
             iwBackground.children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
             iwBackground.children(':nth-child(3)').attr('style', function(i,s){ return s + 'left: 76px !important;'});
             
             var ui = window.navigator.userAgent;
             if(ui.indexOf("MSIE ") > -1 || ui.indexOf('Trident/') > -1 || ui.indexOf('Edge/') > -1) {
               iwBackground.children(':nth-child(3)').children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: 49px;top: -1px;width: 12px;height: 13px;'});        
               iwBackground.children(':nth-child(3)').children(':nth-child(1)').children(':nth-child(1)').attr('style', function(i,s){ return s + 'height: 24px; width: 10px; background-color: '+ currentRouteColor +';' + 'border-left: 2px solid white;'});        
               iwBackground.children(':nth-child(3)').children(':nth-child(2)').attr('style', function(i,s){ return s + 'left: 61px;top: -1px;width: 7px;height: 14px;'});                
               iwBackground.children(':nth-child(3)').children(':nth-child(2)').children(':nth-child(1)').attr('style', function(i,s){ return s + 'height: 100%; width: 7px; background-color: '+ currentRouteColor +';' + 'border-right: 2px solid white;'});        
             } else {
               iwBackground.children(':nth-child(3)').children(':nth-child(1)').attr('style', function(i,s){ return s + 'left: -1px;top: -1px;width: 12px;height: 13px;'});        
               iwBackground.children(':nth-child(3)').children(':nth-child(1)').children(':nth-child(1)').attr('style', function(i,s){ return s + 'height: 24px; width: 10px; background-color: '+ currentRouteColor +';' + 'border-left: 2px solid white;'});        
               iwBackground.children(':nth-child(3)').children(':nth-child(2)').attr('style', function(i,s){ return s + 'left: 11px;top: -1px;width: 7px;height: 14px;'});                
               iwBackground.children(':nth-child(3)').children(':nth-child(2)').children(':nth-child(1)').attr('style', function(i,s){ return s + 'height: 100%; width: 7px; background-color: '+ currentRouteColor +';' + 'border-right: 2px solid white;'});         
             }

             iwBackground.children(':nth-child(3)').find('div').children().css({'box-shadow': 'rgba(237, 178, 233, 0.6) 0px 1px 6px', 'z-index' : '1'});
             var iwCloseBtn = iwOuter.next();
             iwCloseBtn.css({'display': 'none'});
             if(jQuery('.iw-content').height() < 140){
              jQuery('.iw-bottom-gradient').css({display: 'none'});
             }
             iwCloseBtn.mouseout(function(){
               jQuery(this).css({opacity: '1'});
             });
             
          });
}

function setCurrentStop(Code, Name) {
  ToCurrentStopId = Code;
  ToCurrentStopName =  Name;
  //$("#sp_currentstop").html(Name + '<span><i>Stop #' + Code + '</i></span>');
  getETA(true);
}

function UpdateRoute() {
  if(jQuery("#txt_route").val() != "" && ToSelectStopId != "" && jQuery("#txt_route").val() == ToSelectStopName) {
      ToCurrentStopId = ToSelectStopId;
      ToCurrentStopName = ToSelectStopName;
      jQuery("#txt_route").css("border","none");
      //getETA(true);
      getETA();
      displayStopsOnMap();
  } else if(jQuery("#txt_route").val() != ""){
    new google.maps.Geocoder().geocode( { 'address': jQuery("#txt_route").val()}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
            var position = results[0].geometry.location;
            displayStopsOnMap(position.lat(), position.lng());
          }
      }
    });
  } else {
      jQuery("#txt_route").css("border","1px solid red");
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,showError);
  } else {
    displayStopsOnMap();
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  displayStopsOnMap(position.coords.latitude, position.coords.longitude);
}

function showError(error) {
  displayStopsOnMap();
   navigator.permissions.query({name:'geolocation'})
  .then(function(permissionStatus) {  
    console.log('geolocation permission state is ', permissionStatus.state);
    permissionStatus.onchange = function() {  
      console.log('geolocation permission state has changed to ', this.state);
    };
  });
  switch(error.code) {
    case error.PERMISSION_DENIED:
      alert("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      alert("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      alert("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      alert("An unknown error occurred.");
      break;
  }
}

function getVehicles(color) {
  var routeId = jQuery("#p_lt_ctl03_pageplaceholder1_p_lt_ctl00_CustomIndividualLineMap_hdnCurrentRouteCode").val();
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
