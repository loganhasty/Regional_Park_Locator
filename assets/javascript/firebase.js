var config = {
apiKey: "AIzaSyAtHXUUzNphnFhhfEaFgCP6uU1wzc-Qr68",
authDomain: "parkmapper-6ed16.firebaseapp.com",
databaseURL: "https://parkmapper-6ed16.firebaseio.com",
projectId: "parkmapper-6ed16",
storageBucket: "",
messagingSenderId: "127609839901"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#zip-code").on("click", function() {
	event.preventDefault();
	var searchLocation  = $("#zip-code").val().trim();

	database.ref().push({
		searchLocations: searchLocation
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

database.ref().orderByChild("dateAdded").limitToLast(10000).on("child_added", function(snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    $("#searchLocations").append("<br>" + sv.searchLocations);
    alert(sv.searchLocations);
    // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code); 
});


