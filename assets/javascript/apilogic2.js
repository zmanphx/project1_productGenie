//Ford's YouTube API Code


$("#submit").on("click", function () {
    event.preventDefault();
  console.log("test2");
    $(".app-content").empty();
   
  
    $.ajaxSetup({
      beforeSend: function (xhr) {
        xhr.setRequestHeader("X-RapidAPI-Host", "contextualwebsearch-websearch-v1.p.rapidapi.com");
        xhr.setRequestHeader("X-RapidAPI-Key", "cf4c14600fmsh28f5e03d84eb654p195c42jsndb2ed0fb33e2");
      },
    });
    
    var q = $("#search-input")
      .val()
      .trim();
  
  
    var queryURL = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/WebSearchAPI?autoCorrect=true&pageNumber=1&pageSize=10&q=" + q + "&safeSearch=false";
    
    $.ajax({
    url: queryURL,
    method: "GET",
    }).then(function (response) {
      
      var results = response.value;
      
      for (var i = 0; i < results.length; i++) {
        
       var csDiv = $("<div>");
       
        var csTitle = results[i].title;
        var csDescription = results[i].description;
        var csURL = results[i].url;
        
        var titleHeading = $("<h3>").html(csTitle);
        var p = $("<p>").html(csDescription);
        var pURL = $("<h6>").text(csURL);
        
        
        csDiv.append(titleHeading);
        csDiv.append(p);
        csDiv.append(pURL);
        
        $("#context-content").prepend(csDiv);
        
      }
      
      
      console.log(response);
      console.log(response.value);
      console.log(response.value[0].title);
      console.log(response.value[0].url);
    });
    
    });
  
  