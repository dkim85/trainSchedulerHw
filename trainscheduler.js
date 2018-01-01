
  // alert("Tren Agrehhhhhgado!");


  // Initiate Firebase

  var config = {
    apiKey: "AIzaSyAsC8xQZAAZqNZvRT4sRD7YPI_Nssj8n48",
    authDomain: "trainhw-2fad0.firebaseapp.com",
    databaseURL: "https://trainhw-2fad0.firebaseio.com",
    storageBucket: "",
  };
  
firebase.initializeApp(config);

var trainData = firebase.database();


// Grabbin train input
$("#addTrainBtn").on("click", function(){

	var tName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
	var frequency = $("#frequencyInput").val().trim();

	// console.log(firstTrain);
	// return false;
	firebase.database().ref().push( {
		tName: tName,
		destination: destination,
		firstTrain: firstTrain,
		frequency: frequency
	});

	// trainData.ref().push(newTrain);

	// Logs everything to console
	  // console.log(newTrain.name);
	  // console.log(newTrain.destination);
	  // console.log(newTrain.firstTrain);
	  // console.log(newTrain.frequency);

	alert("Train added!");

	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	return false;

});

trainData.ref().on("child_added",function(snapshot, preChildKey){
	var name = snapshot.val().name;
	var destination = snapshot.val().destination;
	var frequency = snapshot.val().frequency;
	var firstTrain = snapshot.val().firstTrain;

	var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
	var minutes = frequency - remainder;
	var arrival = moment().add(minutes,"m").format("hh:mm A");

	console.log(remainder);
	console.log(minutes);
	console.log(arrival);

	$("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");

})




	

	