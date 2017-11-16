var map;
var infowindow;
var location;
var resultsList;
//Initialize map to display parks within a
//1 mile (1609.34 meter) radius of Center City Charlotte
function initMap() {
    $("#current-zip").html("Current Zip: 28202");
    var charlotte = { lat: 35.2295948, lng: -80.8359465 };
    var location =
        map = new google.maps.Map(document.getElementById('map'), {
            center: charlotte,
            zoom: 14
        });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: charlotte,
        radius: 1609.34,
        type: ['park']
    }, callback);
}

function callback(results, status) {
    if ((status === google.maps.places.PlacesServiceStatus.OK) && (location != { lat: 35.2295948, lng: -80.8359465 })) {
        $("#results").empty(); //empty out current values
        var length;
        if (results.length <= 10) { //since there is no param to limit api results, we must do something like this
            length = results.length;
        } else {
            length = 10;
        }
        //===================

        //========================
        for (var i = 0; i < length; i++) { //that way if we have fewer than 10 results, we won't loop too many times and create errors
          //Create a list element for every item returned and append it to the results list
          var resultContainer = $("<li id='resultsLI'>").css("display", "none");
          $("#results").append(resultContainer);
          //Add a div into each list item for the header and body
          resultContainer.html($("<div class='collapsible-header returnedValues'></div><div class ='collapsible-body'></div>").attr('id', 'result-' + (i + 1)));
          //Add the title to the header
          $("#result-" + (i + 1)).append($("<h6>").text(results[i].name));


          //Add the description details to the item bodies
          $(".collapsible-body#result-" + (i + 1))
                .append($("<p>")
                .append("Type: "              + results[i].types[0])
                .append("<br>Rating: "        + results[i].rating)
                .append("<br>Address: "       + results[i].vicinity)
 //               .append("<br>Open Now: "      + results[i].opening_hours.open_now.val())
 //               .append("<br>Entrance Fee: "  + results[i].price_level)
                );

          //Run the function to generate marker photos to be placed onto the map
          createPhotoMarker(results[i]);
        }
        //Add an effect when loading the results in the list
        $("li").velocity("transition.slideUpIn", { stagger: 150 });

    } else {
        $("#results").empty(); //what if the status does not come back as ok, maybe it has zero results?
            var noPark = $("#results").html($('<p> No parks in your area</p>').css('text-align','center').css('padding-bottom', '5px'));
  
    }
}

function createPhotoMarker(place) {
    var photos = place.photos;
    if (!photos) {
      return ;
    }

    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        title: place.name,
        animation: google.maps.Animation.DROP,
        // If you'd like markers to populate as images of the location, uncomment line below :
        
        // icon: photos[0].getUrl({'maxWidth': 50, 'maxHeight': 50})
    });


    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(place.name);
        infowindow.open(map, this);
    });
}



//The functions below are for obtaining lat/long coordinates
///////////////////////////////////////////////////
function showResult(result) {
    var lat = result.geometry.location.lat();
    var long = result.geometry.location.lng();
    var address = {
        lat: lat,
        lng: long
    };
    map = new google.maps.Map(document.getElementById('map'), {
        center: address,
        zoom: 14 //adjusted zoom to show all results
    });

    infowindow = new google.maps.InfoWindow();
    var service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: address,
        radius: 1609.34,
        type: ['park']
    }, callback);

}

function getLatitudeLongitude(callback, address) {
    // If address is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0]);
            }
        });
    }
}

//Submit Search button functionality
//////////////////////////////////////////////

$("#submit-search").on("click", function() { //no need to hide the current values
    var address = document.getElementById('zip-code').value.trim();
    getLatitudeLongitude(showResult, address);
    $("#current-zip").empty();
    $("#current-zip").html("Current Zip: " + address);

    event.preventDefault();
    var searchLocation  = $("#zip-code").val().trim();

    database.ref().push({
        searchLocations: searchLocation,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});
