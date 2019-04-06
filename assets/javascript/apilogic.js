// Mike's code from Postman, Aliseeks API

$("#submit").on("click", function() {
    event.preventDefault();
  console.log("test");
   $(".app-content").empty();
  
  var item = $("#search-input")
       .val()
       .trim();
       
       var mytest=       {
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
            mytest.text = item;
              //mytest.text = "radio";
      
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
      
                
        "data":JSON.stringify(mytest)
      
              }
      // '{\n  "text": "battery backup",\n  "priceRange": {\n    "from": 12.50,\n    "to": 30.00\n  },\n  "shipToCountry": "US",\n  "shipFromCountry": "CN",\n  "sort": "BEST_MATCH",\n  "skip": 20\n}'
      
      
              $.ajax(settings).done(function(response) {
               
               
                console.log("checking " + response);
                // console.log("checking " + response.items[0].title);
      
                var results = response;
                console.log(results);
      
                for (var i = 0; i < 10; i++) {
                  var gifDiv = $("<div id='gifDiv'>");
                      gifDiv.css({"float":"left", "margin-left":"35px;", "margin-right":"20px", "width":"300px"});
                  var detailUrl = response.items[i].detailUrl;
                  var anch = $("<a>").text("More Info:");
                  anch.attr({href: detailUrl, target:"_blank"});
                
      
                  var pTitle = $("<p>").text("Title: " + response.items[i].title);
                      pTitle.css("width", "300px");
                    var pPrice = $("<p>").text("Price: $" + response.items[i].priceOptions[0].amount.value + " " );
                     
                      pPrice.append(anch);
                  var itemImage = $("<img>");
                  itemImage.attr("src", response.items[i].imageUrl);
                  itemImage.attr({ height: "250px", width: "250px" });
      
                  gifDiv.prepend(pPrice);
                  gifDiv.prepend(pTitle);
                  gifDiv.prepend(itemImage);
      
                  $("#aliseeks").prepend(gifDiv);
                }
              });
            });
  