$(document).ready(function () {
  //Initializing firebase
  var config = {
    apiKey: "AIzaSyBgGduOAce6w4-w4GH9unXRAU1d1oHn2Yk",
    authDomain: "product-genie-50928.firebaseapp.com",
    databaseURL: "https://product-genie-50928.firebaseio.com",
    projectId: "product-genie-50928",
    storageBucket: "product-genie-50928.appspot.com",
    messagingSenderId: "729140007564"
  };
  firebase.initializeApp(config);

  //On click event to add user input to firebase
  var database = firebase.database();
  $("#submit").on('click', function (event) {
    $("#search-input").empty();
    var recentSearch = $("#search-input").val().trim();

    database.ref().push({
      RecentSearch: recentSearch
    });

  });


  //On click to append recentSearch to currentSearch
  database.ref().on("child_added", function(childSnapshot) {
    // Log everything that's coming out of snapshot
    console.log(childSnapshot);

    
    // do stuff here 
    
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });


  //Possible starting point for price range filter taking the variable of data and creating a function.
  //Price needs to be the name of the returned price from API's
  //data.filter(function(x){ return x.Price >= 250 && x.Price <= 800});

  //Functionality for price dropdown

});