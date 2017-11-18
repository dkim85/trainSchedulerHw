
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
	var priTraName = moment($("#first-TraName-input").val().trim(), "DD/MM/YY").format("X");
	var traFrecuency = $("#frecuency-input").val().trim();

	// Local "temporary" object holding emp.data

	var newTrain = {
		trainName: traName,
		destination: traDestination,
		firstTrainName: priTraName,
		frecuency: traFrecuency
	};

	// Uploads train data to the database
	database.ref().push(newTrain);

	// // Logs everything to console
	// console.log(newTrain.trainName);
	// console.log(newTrain.destination);
	// console.log(newTrain.firstTrainName);
	// console.log(newTrain.frecuency);

	// Alert
	alert("Train succesfully added");

	// Clears all of the text-boxes
	$("#train-name-input").val("");
	$("#destination-input").val("");
	$("#firstTraName-input").val("");
	$("#frecuency-input").val("");
	});

	// Creates firebase event for adding train to the database and when the user adss an entry
	database.ref().on("child_added", function(childSnapShot, prevChildKey) {

	console.log(childSnapShot.val());

	// store everything into a var.
	var traName = childSnapShot.val().trainName;
	var traDestination = childSnapShot.val().destination;
	var priTraName = childSnapShot.val().firstTrainName;
	var traFrecuency = childSnapShot.val().frecuency;

	//  Train info
	// console.log(traName);
	// console.log(traDestination);
	// console.log(priTraName);
	// console.log(traFrecuency);

	var differenceTimes = moment().diff(moment.unix(priTraName), "minutes");
	var remainder = moment().dif(momment.unix(priTraName), "minutes") % traFrecuency;
	var minutes = traFrecuency - remainder;

	var arrival =  moment().add(minutes, "m").format("hh:mm A");
	console.log(minutes);
	console.log(arrival);
	console.log(moment().format("hh:mm A"));
    console.log(arrival);
    console.log(moment().format("X"));

    // Append train data to table 
    $("#trainSchedule > tbody").append("<tr><td>" + traName + "</td><td>" + traDestination + "</td><td>" + priTraName + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");
});



	

	