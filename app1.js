var config = {
    apiKey: "AIzaSyBAzfc6RaIyDQJr4vxjyCqqrJYpbDUfUDs",
    authDomain: "train-2a654.firebaseapp.com",
    databaseURL: "https://train-2a654.firebaseio.com",
    projectId: "train-2a654",
    storageBucket: "train-2a654.appspot.com",
    messagingSenderId: "406225043703"
  };
  
  firebase.initializeApp(config);

var db = firebase.database();

var newTrain = "";
var newDestination = "";
var firstTrain = "05:00";
var frequency = 0;
var tMinutesTillTrain = "00:00";
var nextTrain = "00:00";


$(".addTrainForm").on("submit", function (event) {
    event.preventDefault()

    var trainData = $(".addTrainForm").serializeArray()
    console.log(trainData)

    // var newTrain = {
    //     [trainData[0].name]: trainData[0].value,
    //     [trainData[1].name]: trainData[1].value,
    //     [trainData[2].name]: trainData[2].value,
    //     [trainData[3].name]: trainData[3].value
    // }
   
    
    newTrain = trainData[0].value;
    newDestination = trainData[1].value;
    firstTrain= trainData[2].value;
    frequency = trainData[3].value;
    
    db.ref().push({
        newTrain: newTrain,
        newDestination: newDestination,
        frequency: firstTrain,
        firstTrain: frequency
    })


})
 

db.ref().on("child_added", function(snapshot){
console.log(newTrain)

var newTrainFire = snapshot.val().newTrain;
var newDestinationFire = snapshot.val().newDestination;
var frequencyFire = snapshot.val().frequency;
var firstTrainFire = snapshot.val().firstTrain;


console.log(newTrainFire)
console.log(newDestinationFire)
console.log(frequencyFire)
console.log(firstTrainFire)


var firstTrainConverted = moment(firstTrainFire, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted)
    var currentTime = moment();
    
    var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
    
    
    var remainder = diffTime % frequencyFire;
    console.log(remainder);

    var timeUntilTrain = frequencyFire - remainder;
    console.log("MINUTES TILL TRAIN: " + timeUntilTrain);
    
    
    var nextTrain = moment().add(timeUntilTrain, "minutes");
    var nextTrainConversion = moment(nextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

$(" tbody").append("<tr><td>" + newTrainFire + "</td><td>" + newDestinationFire + "</td><td>" +
  frequencyFire + "</td><td>" + nextTrainConversion + "</td><td>" + timeUntilTrain + "</td></tr>");

// var tr = $("<tr>")

// $("tbody").append(tr)

// $("tbody").append("<tr><td>" + empName + "</td><td>" + empRole + "</td><td>" +
//   empStartPretty + "</td><td>" + empMonths + "</td><td>" + empRate + "</td><td>" + empBilled + "</td></tr>");




// var tdTrain = $("<td>")
// var tdDest = $("<td>")
// var tdFrequency = $("<td>")
// var tdNextArrival = $("<td>")
// var tdMinsAway = $("<td>")

// console.log(tdTrain)

// $(tdTrain).text(snapshot.val().newTrain).appendTo(tr)
// $(tdDest).text(newDestination).appendTo(tr)
// $(tdFrequency).text(firstTrain).appendTo(tr)
// $(tdNextArrival).text(nextTrainConversion).appendTo(tr)
// $(tdMinsAway).text(tMinutesTillTrain).appendTo(tr)
})

   





