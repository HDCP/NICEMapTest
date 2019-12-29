jQuery(document).ready(function () {
	
   jQuery("#chk_mylocation").on("change", function () {
     	ShowLoading();
        if (jQuery(this).is(":checked")) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition1, showError1);
            } else {
                alert("Geolocation is not supported by this browser.");
               HideLoading();
            }
        } else {
            var url = "/NICECustomPages/getjsondata.aspx?getData=allroutes";
            getRoutesData(url);
        }
    });
});

function getRoutesData(url) {
    jQuery.ajax({
        type: "GET",
        url: url,
		contentType: "application/json",
        dataType: "json",
        success: function (response) {
             HideLoading();
            jQuery("#routecontent").html(response.ResultData[0].HtmlContent);
        },
        error: function (jqXHR, textStatus, errorThrown) {
           HideLoading();
            console.log(errorThrown);
        }
    });
}

function showPosition1(position) {
    var url = "/NICECustomPages/getjsondata.aspx?getData=getnearbylines&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&buffer=1";
    getRoutesData(url);
}

function showError1(error) {
   HideLoading();
    navigator.permissions.query({ name: 'geolocation' })
        .then(function (permissionStatus) {
            console.log('geolocation permission state is ', permissionStatus.state);
            permissionStatus.onchange = function () {
                console.log('geolocation permission state has changed to ', this.state);
            };
        });
    switch (error.code) {
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


function searchRoutes() {
  ShowLoading();
  var url = "/NICECustomPages/getjsondata.aspx?getData=filterroutebyname&name=" + jQuery("#txt_searchRoute").val();
  jQuery.ajax({
        type: "GET",
        url: url,
		contentType: "application/json",
        dataType: "json",
        success: function (response) {
           HideLoading();
            jQuery("#routecontent").html(response.ResultData[0].HtmlContent);
        },
        error: function (jqXHR, textStatus, errorThrown) {
           HideLoading();
            console.log(errorThrown);
        }
  });
}

function ShowLoading(){
  jQuery(".ball-loader").show();
  jQuery("#routecontentwrapper").css("opacity",0.5);
  jQuery("#routecontentwrapper").css("background-color","#e9e9e9");
  jQuery("#routecontentwrapper").css("z-index",10000000);
}

function HideLoading() {
  jQuery(".ball-loader").hide();
  jQuery("#routecontentwrapper").css("opacity",1);
  jQuery("#routecontentwrapper").css("background-color","#fff");
  jQuery("#routecontentwrapper").css("z-index",100);
}