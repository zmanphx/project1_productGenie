// Mike's code from Postman, Aliseeks API

$("#submit").on("click", function () {
  event.preventDefault();
  console.log("test");

  var q = $("#search-input")
  .val()
  .trim();

  searchAliExpress(q);
  searchContextWeb(q);
});


//*********************************************************************************/


// function to call AliExpress api and render results  
function searchAliExpress(searchItem) {

  // clear info from prior request
  $(".imageDiv").empty();
  $(".reviewDiv").empty();

  // grab user input
  // var item = $("#search-input")
  //   .val()
  //   .trim();

  // test object
  var mytest = {
    "text": "battery backup",
    "priceRange": {
      "from": 100,
      "to": 500
    },
    "shipToCountry": "US",
    "shipFromCountry": "CN",
    "sort": "BEST_MATCH",
    "skip": 20
  };

  mytest.text = searchItem;
  //mytest.text = "radio";


  //*********************************************************************************/


  // build api request
  var settings = {
    url: "https://api.aliseeks.com/v1/search/realtime",
    method: "POST",
    timeout: 0,
    headers: {
      "X-API-CLIENT-ID": "NYODHSXYXONWCIZP",
      "Content-Type": "application/json",
      "cache-control": "no-cache",
      "Postman-Token": "ee780696-5614-44fd-8d0e-2d815309f864"
    },
    "processData": false,


    "data": JSON.stringify(mytest)

  }
  // '{\n  "text": "battery backup",\n  "priceRange": {\n    "from": 12.50,\n    "to": 30.00\n  },\n  "shipToCountry": "US",\n  "shipFromCountry": "CN",\n  "sort": "BEST_MATCH",\n  "skip": 20\n}'


  //*********************************************************************************/


  // call the api
  $.ajax(settings).done(function (response) {


    console.log("checking " + response);
    // console.log("checking " + response.items[0].title);

    var results = response;

    console.log(results);

    for (var i = 0; i < 10; i++) {
      var gifDiv = $("<div>").addClass("imageDiv");
      gifDiv.css({
        "float": "left",
        "margin-left": "35px;",
        "margin-right": "20px",
        "width": "300px"
      });
      var detailUrl = response.items[i].detailUrl;
      var anch = $("<a>").addClass("infoLink").text("More Info");
      anch.attr({
        href: detailUrl,
        target: "_blank"
      });

      var itemRating;

      if (typeof response.items[i].ratings != 'undefined')   {
          itemRating = response.items[i].ratings;

      }
      else
      {   itemRating = 'NA';}

      var pTitle = $("<p>").addClass("itemTitle").text("Title: " + response.items[i].title);

      pTitle.css("width", "300px");

      var pPrice = $("<p>").addClass("itemPrice").html("Price: $" + response.items[i].priceOptions[0].amount.value + " " + "<b> Rating:</b> " + itemRating + " ");

      // pPrice.append(anch);
      var itemImage = $("<img>").addClass("searchImg");

      itemImage.attr("src", response.items[i].imageUrl);

      itemImage.attr({
        height: "250px",
        width: "250px"
      });

      itemImage.attr("itemId", response.items[i].id);
      itemImage.attr( "Title", response.items[i].title);

      gifDiv.prepend(anch);
      gifDiv.prepend(pPrice);
      gifDiv.prepend(pTitle);
      gifDiv.prepend(itemImage);

      $("#aliseeks").prepend(gifDiv);
    }
  });
}


//*********************************************************************************/


//new click event here for reviews
$(document).on("click", ".searchImg", function (event) {

  event.preventDefault();
  //event.stopPropagation();

  var itemTitle = $(this).attr("Title");

  var pdescr = $("<p>").html("<b>" +itemTitle +"</b>");

  if (event.target.localName == "img") {

    $(".reviewDiv").empty();

    event.stopPropagation();

    var mytestReview = {
      productId: "32844651460",
      page: 1
    }

    mytestReview.productId = $(this).attr("itemId");

    var settingsReviews = {
      url: "https://api.aliseeks.com/v1/products/reviews",
      method: "POST",
      timeout: 0,
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        "X-Api-Client-Id": "NYODHSXYXONWCIZP"
      },
      data: JSON.stringify(mytestReview),
      success: function (xhr) {
        console.log(xhr);


        for (var i = 0; i < 5; i++) {
          var gifDiv = $("<div>").addClass("reviewDiv");
          gifDiv.css({
            "margin-left": "45px;",
            "margin-right": "20px",
            "width": "300px",
            "margin-top":"20px"
          });
          var translateR = xhr.reviews[i].translatedReview;


          var pTitle = $("<p>").html("<b>Review Date: </b>" + xhr.reviews[i].reviewDate + " <b>Buyer:</b>" + xhr.reviews[i].buyerName + "  <b>Rated:</b> " + xhr.reviews[i].upVotes);
          pTitle.css("width", "350px");
          var pReview = $("<p>").text(translateR);

          /*  var pPrice = $("<p>").html("<b>Price:</b>" +"$" + response.items[i].priceOptions[0].amount.value + " " + "<b> Rating:</b>" + response.items[i].ratings + " "); */


          if (typeof xhr.reviews[i].images != 'undefined') { // check if optional property exists

            var itemImage = $("<img>");
            itemImage.attr("src", xhr.reviews[i].images[0]);


            itemImage.attr({
              height: "250px",
              width: "250px"
            });
            gifDiv.prepend(pReview);
            gifDiv.prepend(pTitle);
            gifDiv.prepend(itemImage);
          } else {
            gifDiv.prepend(pReview);
            gifDiv.prepend(pTitle);
            gifDiv.prepend(pdescr);
          }
          $("#writtenReviewsBox").prepend(gifDiv);
        }
      },
      error: function () {
        console.log('Problem calling aliseeks');
      }
    };

    $.ajax(settingsReviews)
  };

});
$(document).on("click", ".searchBtn", function (event) {
  event.preventDefault();
  //event.stopPropagation();

  var strItem = $(this).attr("data-name");
  $("#search-input").text(strItem);
  

  searchAliExpress(strItem);
  searchContextWeb(strItem);

});

//*********************************************************************************/


// function to call Contextual Web Search api and render results
function searchContextWeb(searchItem) {

  $(".csDiv").empty();


  $.ajaxSetup({
    beforeSend: function (xhr) {
      xhr.setRequestHeader("X-RapidAPI-Host", "contextualwebsearch-websearch-v1.p.rapidapi.com");
      xhr.setRequestHeader("X-RapidAPI-Key", "cf4c14600fmsh28f5e03d84eb654p195c42jsndb2ed0fb33e2");
    },
  });

  q= searchItem;
  // var q = $("#search-input")
  //   .val()
  //   .trim();


  var queryURL = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?autoCorrect=true&pageNumber=1&pageSize=10&q=" + q + "&safeSearch=false";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {

    var results = response.value;

    for (var i = 0; i < results.length; i++) {

      var csDiv = $("<div>").addClass("csDiv");

      var csTitle = results[i].title;
      var csDescription = results[i].description;
      var csURL = results[i].url;

      var csAnch = $("<a>").addClass("infoLink").text(csURL);
      csAnch.attr({
        href: csURL, target: "_blank"
      });


      var titleHeading = $("<h3>").html(csTitle);
      var p = $("<p>").html(csDescription);
      // var pURL = $("<h6>").text(csURL);


      csDiv.append(titleHeading);
      csDiv.append(p);
      csDiv.append(csAnch);

      $("#context-content").prepend(csDiv);

    }


    console.log(response);
    console.log(response.value);
    console.log(response.value[0].title);
    console.log(response.value[0].url);
  });

};

