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
//var ref = database.ref().child("RecentSearch");
//ref.on('child_added' function(childsnapshot, prevChildName) {

//})



//Possible starting point for price range filter taking the variable of data and creating a function.
//Price needs to be the name of the returned price from API's
//data.filter(function(x){ return x.Price >= 250 && x.Price <= 800});

//Functionality for price dropdown
$("#dropbtn").on('click', myFunction(), filterFunction()) 

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("");
};

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    };
  };
};
});