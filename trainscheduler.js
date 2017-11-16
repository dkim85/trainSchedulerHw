// Firebase Link
//initialize firebase

  var config = {
    apiKey: "AIzaSyCH9VBppme9RMxJbIV18u_kMoxm-jj-FmM",
    authDomain: "train-scheduler-9a7ad.firebaseapp.com",
    databaseURL: "https://train-scheduler-9a7ad.firebaseio.com",
    storageBucket: "",
  };

  firebase.initializeApp(config);

  var database = firebase.database();

// 2.Button for adding train
$("#add-train-btn").on("click",function(event){
	event.preventDefault();

	// Grabs train input
	var traName = $("#train-name-input").val().trim();
	var traDestination = $("#destination-input").val().trim();
	var traFirstTime = $("#first-input").val().trim();
	var traFrecuency = $("#frecuency-input").val().trim();

	// Local "temporary" object holding emp.data

	var newTrain = {
		name: traName,
		destination: traDestination,
		start: traFirstTime,
		frecuency: traFrecuency
	};

	// Uploads train data to the database
	database.ref().push(newTrain);

	// Logs everything to console
	console.log(traName.name);
	console.log(traName.destination);
	console.log(traName.start);
	console.log(traName.frecuency);

	// Alert
	alert("Train succesfully added");

	// Clears all of the text-boxes
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#first-input").val("");
	$("#frecuency-input").val("");

});

// Creates firebase event for adding train to the database and when the user adss an entry
database.ref().on("child_added", function(childSnapShot, prevChildKey) {

	console.log(childSnapShot.val());

	// store everything into 1 var.
	var traName = childSnapShot.val().name;
	var traDestination = childSnapShot.val().destination;
	var traFirstTime = childSnapShot.val().start;
	var traFrecuency = childSnapShot.val().frecuency;

	//  Train info
	console.log(traName);
	console.log(traDestination);
	console.log(traFirstTime);
	console.log(traFrecuency);
})


