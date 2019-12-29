
jQuery(document).ready(function () {
  
       jQuery("#in_date").datepicker();
        setDefaultDateTime();
		var input = document.getElementById("startFrom");
		var autocomplete = new google.maps.places.Autocomplete(input);
		var inputs = document.getElementById("endAt");
		var autocompletes = new google.maps.places.Autocomplete(inputs);
        jQuery("#chk_start").on("click", function(){
          if(jQuery(this).prop("checked")) {
            getCurrentLocation("start");
          } else {
            jQuery("#startFrom").val("");
          }
        });
        jQuery("#chk_end").on("click", function(){
          if(jQuery(this).prop("checked")) {
            getCurrentLocation("end");
          } else {
            jQuery("#endAt").val("");
          }
        });       
      jQuery('[data-popup-open]').on('click', function(e)  {
          var targeted_popup_class = jQuery(this).attr('data-popup-open');
          currentPopupValue = jQuery(this).attr('id');
          jQuery('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
          e.preventDefault();
         initializePopupFrom();
       });
        //----- CLOSE
      jQuery('[data-popup-close]').on('click', function(e)  {
          var targeted_popup_class = jQuery(this).attr('data-popup-close');
         jQuery('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
            e.preventDefault();
       });
});
var currentPopupValue = "";
var geocoder; 

function getCurrentLocation(val){
   geocoder = new google.maps.Geocoder();
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos){
         console.log('geolocation position', pos);
        geocoder.geocode({
          latLng: new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude)
          }, function(responses) {
            if (responses && responses.length > 0) {
              if(val == "start") {
                jQuery("#startFrom").val(responses[0].formatted_address);
              } else {
                jQuery("#endAt").val(responses[0].formatted_address);
              }
            } else {
              alert('Cannot determine address at this location.');
          }
        });
      },showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
}

function showError(error) {
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

function reset() {
  jQuery("#map_canvas").hide();
  jQuery("#sel_travelmode").val("TRANSIT");
  jQuery("#sel_preference").val("FEWER_TRANSFERS");
  jQuery("#sel_leave").val("leave");
  jQuery("#startFrom").val("");
  jQuery("#endAt").val("");
  jQuery("#sel_time").val("01:00 AM");
  jQuery("#in_date").val("");
  jQuery("#chk_start").prop("checked", false);
  jQuery("#chk_end").prop("checked", false);
  setDefaultDateTime();
}

function n(n){
    return n > 9 ? "" + n: "0" + n;
}

function setDefaultDateTime() {
  
  jQuery("#in_date").datepicker("setDate", new Date());
   
    var dTime1 = new Date();
    var dTime = new Date();
    dTime.setTime(dTime1.getTime() + (60 * 60 * 1000));
    var hoursp = dTime1.getHours();
    var hours = dTime.getHours();
    var minute = dTime.getMinutes();
    if (minute > 30) 
    {
      if(hours<=10)
      {
          hours = "0"+hours + ":00:00";
      }
      else
      {
          hours = hours + ":00:00";
      }
    }
    else 
    { 
      if(hours<=10)
      {
          hours = "0"+hoursp + ":30:00";
      }
      else
      {
        hours = hoursp + ":30:00";
      }
    }
    jQuery("#sel_time").val(hours);
}

function goToTripPlanner() {
  if(jQuery("#startFrom").val() != "" && jQuery("#endAt").val() != "")
  {
    var url = "/Tools/Trip-Planner?from="+ jQuery("#startFrom").val() + "&to=" + jQuery("#endAt").val() +
      "&mode=" + jQuery("#sel_travelmode").val() + "&pre=" + jQuery("#sel_preference").val() + "&leave=" + jQuery("#sel_leave").val() +
      "&time=" + jQuery("#sel_time").val() + "&date=" + jQuery("#in_date").val();
    window.location.href = url;
  } else {
    alert("Please enter Start From and End At addresses.");
    jQuery("#startFrom").focus();
  }
}
  


// popup maps

function initializePopupFrom() {
  geocoder = new google.maps.Geocoder();
  localStorage.setItem("lat", "");
  localStorage.setItem("lng", "");
  var address = "";
  if(currentPopupValue == 'from') {
     address = jQuery("#startFrom").val();
  } else {
    address = jQuery("#endAt").val();
  }
  
  
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        localStorage.setItem("lat", results[0].geometry.location.lat());
        localStorage.setItem("lng", results[0].geometry.location.lng());
      } 
    }); 
  
  
  setTimeout(function(){
  var myLatlng = new google.maps.LatLng(40.728701, -73.607679);
  if(localStorage.getItem("lat") != "" && localStorage.getItem("lng") != "") {
    myLatlng = new google.maps.LatLng(localStorage.getItem("lat"), localStorage.getItem("lng"));
  }
 
  var mapOptions = {
    center: myLatlng,
    zoom: 14
  };

  var map = new google.maps.Map(document.getElementById("map_from"), mapOptions);
  var geocoder = new google.maps.Geocoder;
  var infowindow = new google.maps.InfoWindow;
  
  var marker = new google.maps.Marker({
                  position: myLatlng,
                  map: map,
                  title: 'I move with you man :)'
            });
  
  google.maps.event.addListener(map, 'click', function(e){
    //marker.setPosition(e.latLng);
    map.panTo(e.latLng)
    //map.setCenter(e.latLng);
  });
  
  google.maps.event.addListener(map, 'center_changed', function() {
      var center = map.getCenter();
      marker.setPosition(center);

      window.setTimeout(function(){
        geocodeLatLng(geocoder, map, infowindow, marker);
      }, 2000);
  });
  },1000);
}

function geocodeLatLng(geocoder, map, infowindow, marker) {
  geocoder.geocode({'location': marker.position}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      console.log(results);
      if (results[1]) {
        //map.setZoom(11);
        localStorage.setItem("address", results[1].formatted_address);
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
      } else {
        console.warn('GeoCoder: No results found');
      }
    } else {
      console.warn('Geocoder failed due to: ' + status);
    }
  });
}

function confirmLocation() {
  if(currentPopupValue == 'from') {
    jQuery("#startFrom").val(localStorage.getItem("address"));
  } else {
    jQuery("#endAt").val(localStorage.getItem("address"));
  }
}