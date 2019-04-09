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


  //*********************************************************************************/


  // var database = firebase.database();
  var searchRef = firebase
    .database()
    .ref()
    .child("RecentSearches");
  searchRef.remove();
  // clear the searches from the databases on page reload. 


  //*********************************************************************************/


  //On click event to add user input to firebase
  // var database = firebase
  //   .database()
  //   .ref()
  //   .child("RecentSearches");
  $("#submit").on("click", function (event) {
    event.preventDefault();

    event.stopPropagation();

    var recentSearch = $("#search-input")
      .val()
      .trim();

    $("#search-input").val("");

    searchRef.push({ recentSearch });
    //using a push to add new record  to recentSearch  
  });


  //**********************************************************************************/



  //***********************************************************
// mytest.text = searchItem;
// mytest.priceRange.from = $("#from").val();
// mytest.priceRange.to = $("#To").val();
//**********************************************************



  //On click to append recentSearch to currentSearch
  searchRef.on(
    "value",
    function (childSnapshot) {
      // this gets called everytime the database changes like a pushed new record search
      // If you use  on "child added", it repeats for every single child when the page first loads
      $("#searchesHere").empty();
      // created a div to put the recent searchs , making button. 
      // Empty the div after everysearch to create the buttons cause we are going to recreate all of the searches

      // var childVal;
      result = childSnapshot.val();
      // iterate through all the children records. 
      childSnapshot.forEach(function (child) {
        var myObj = child.val();
        makeSearchButtons(myObj.recentSearch);
        console.log(myObj.recentSearch);
      });
      // do stuff here
    },
    function (errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );

  //*********************************************************************************/

  function makeSearchButtons(searchStr) {
    //create a button using jquery
    var newButton = $("<button>");
    //add a class for the button

    newButton.addClass("searchBtn");

    $(".searchBtn").css({ "margin-right": "5px", "margin-top": "10px" });

    newButton.attr("data-name", searchStr);

    // text to the button
    newButton.text(searchStr);

    $("#searchesHere").prepend(newButton);
  }
});
