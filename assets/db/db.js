  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAtHXUUzNphnFhhfEaFgCP6uU1wzc-Qr68",
    authDomain: "parkmapper-6ed16.firebaseapp.com",
    databaseURL: "https://parkmapper-6ed16.firebaseio.com",
    projectId: "parkmapper-6ed16",
    storageBucket: "parkmapper-6ed16.appspot.com",
    messagingSenderId: "127609839901"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#displayDB").on("click", function() {
    $("#results").empty();
    $("#current-zip").html("Past Locations:");
    database.ref().orderByChild("dateAdded").limitToLast(12).on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
        var sv = snapshot.val();

        $("#results").prepend('<h6>' + sv.searchLocations);
        // Handle the errors
        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code); 
    });
});

