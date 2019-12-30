function getVehicles4() {
  // var methodName = "getrealtime";
  // var url = window.location.origin + "/NICECustomPages/getjsondata.aspx?getData=" + methodName + "&route_id="+ routeId;
  var url4 = "https://cors-anywhere.herokuapp.com/https://www.nicebus.com/NICECustomPages/getjsondata.aspx?getData=getrealtime&route_id=n27,n31,n32,n33,n35,n40_41,n43,n48,n49,n54";
  
  jQuery.ajax({
       type: "GET",
       url: url4,
       cache: false,
       // contentType: "application/json",
       Accept: "*/*",
       contentType: "text/plain",
       origin: "https://hdcp.github.io",
       dataType: "json",
       success: function (response)
       {
          var data = response.ResultData;
          // var icon = window.location.origin + "/App_Themes/Default/Images/DocumentTypeIcons/RealTime-Inner-bus-lines.png";
          // var outer_icon = window.location.origin + "/App_Themes/Default/Images/DocumentTypeIcons/RealTime-Outer.svg";
	  var icon = window.location.origin + "/NICEMap/images/RealTime-Inner-bus-lines.png";
          var outer_icon = window.location.origin + "/NICEMap/images/RealTime-Outer.svg";
          var marker, point;
          if(Object.keys(markerStore4).length > (data.length * 2)) {
            var objArr = Object.keys(markerStore4);
            for(var i=0; i< objArr.length; i++) {
              var selectedMarker = jQuery.map(data, function(val, index){
               if( String(objArr[i]) ==  String(val.vid + "1111") || String(objArr[i]) ==  String(val.vid + "2222")){
                 return index;
               }
              });
              if(selectedMarker.length == 0) {
                markerStore4[objArr[i]].setMap(null);
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
            
            if(markerStore4.hasOwnProperty(data[i].vid + 1111)) {
              markerStore4[data[i].vid + 2222].setIcon(outerIcon);
              
              markerStore4[data[i].vid + 1111].animateTo(point,{  easing: "linear",
                                 duration: 10000
                              });
              markerStore4[data[i].vid + 2222].animateTo(point,{  easing: "linear",
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
              markerStore4[data[i].vid + 1111] = marker;
              marker = new google.maps.Marker({
                position: point,
                map: map,
                icon: outerIcon,
                title: data[i].vid + 2222,
                zIndex: 9999 + i,
                optimized: false
              }); 
              markerStore4[data[i].vid + 2222] = marker;              
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
