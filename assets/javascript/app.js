$(document).ready(function() {
  // Firebase API
  var firebaseConfig = {
    apiKey: "AIzaSyBuis7Ibp7T2HfwvmvmIRsfYnmaeNx4htc",
    authDomain: "week8proejct.firebaseapp.com",
    databaseURL: "https://week8proejct.firebaseio.com",
    projectId: "week8proejct",
    storageBucket: "week8proejct.appspot.com",
    messagingSenderId: "83323624903",
    appId: "1:83323624903:web:adcfda550451ab0b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  $("#button").on("click", function() {
    event.preventDefault();

    // This is gonna empty all the previous search results
    $("#articles").empty();
    $("#artistInfo").empty();

    // This line grabs the input from the textbox

    var artistName = $("#search")
      .val()
      .trim();

    database.ref().push({
      newArtist: artistName
    });

    var queryURL =
      "https://newsapi.org/v2/everything?q=" +
      artistName +
      "&apiKey=787c8e2866844a7c94f18cfad8f6bc06&tot&pageSize=4";
      var queryURL2 = "https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?...&keywords=" + artistName + "&app_key=txM6TBSz6KpmbjwL";
      var queryURL3 = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=" + artistName;

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response){
       console.log(response);
       var results = response.articles;
       for(var i = 0; i < results.length; i++) {
           var resultsDiv = $('<div>')
           var p = $('<p>').text(results[i].description)
           var myBreak = $('<br>')
           var url = results[i].url
           var linkTag = $('<a>').attr('href', url).text('More Info')
           var picUrl = results[i].urlToImage
           var pic = $('<img>').attr( { src:picUrl, height:"200px", width: "200px" } )
           resultsDiv.append(p)
           resultsDiv.prepend(linkTag)
           resultsDiv.prepend(pic)
           $('#articles').append(resultsDiv)
          //  $('#events').append(pic)
       }
    
      })
    
    
      $.ajax({
        url: queryURL2,
        method: "GET"
      }).then(function(response){
        console.log(response);
        // console.log(response.events.event[0].description);
    
      })
      
    
      $.ajax({
        url:queryURL3,
        method: "GET"
      }).then(function(response){
        console.log(response);
        var results = response.data;
        for (var i = 0; i < 5; i++) {
          var resultsDiv = $("<div>");
    
          var name = $("<p>").text(results[i].title);
          resultsDiv.append(name);
          $("#video").append(resultsDiv);
    
    
        }
      })
  });
});
