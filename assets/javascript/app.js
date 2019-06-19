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

  $("#articles").hide();
  $("#tracks").hide();
  $("#concerts").hide();

  $("#button").on("click", function() {
    event.preventDefault();
    $("#articles").show();
    $("#tracks").show();
    $("#concerts").show();

    // This will empty all the previous search results
    $("#articles").empty();
    $("#artistInfo").empty();
    $("#tracks").empty();
    $("#concerts").empty();

    // This line grabs the input from the text box

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
    var queryURL2 =
      "https://cors-anywhere.herokuapp.com/http://api.eventful.com/json/events/search?keywords=" +
      artistName +
      "&app_key=txM6TBSz6KpmbjwL";
    var queryURL3 =
      "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=" +
      artistName;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var results = response.articles;
      for (var i = 0; i < results.length; i++) {
        var resultsDiv = $("<div>");
        var p = $("<p>").text(results[i].description);
        var myBreak = $("<br>");
        var url = results[i].url;
        var linkTag = $("<a>")
          .attr("href", url)
          .text(" " + "More Info");
        var picUrl = results[i].urlToImage;
        var pic = $("<img>").attr({
          src: picUrl,
          height: "200px",
          width: "300px"
        });
        resultsDiv.append(p);
        resultsDiv.prepend(linkTag);
        resultsDiv.prepend(pic);
        $("#articles").append(resultsDiv);
        //  $('#events').append(pic)
      }
      var header = $("<h1>");
      header.addClass("articles");
      header.text("News Articles");
      $("#articles").prepend(header);
      $("#artistInfo").text(artistName.toUpperCase());
    });

    $.ajax({
      url: queryURL2,
      method: "GET"
    }).then(function(response) {
      response = JSON.parse(response);
      var results = response.events.event;
      for (var i = 0; i < results.length; i++) {
        var resultsDiv = $("<div>");
        var newLine = $("<br>");
        var events = $("<p>").text(results[i].title);
        var start = $("<p>").text(results[i].start_time);
        var place = $("<p>").text(
          results[i].venue_name +
            ", " +
            results[i].venue_address +
            " " +
            results[i].city_name +
            ", " +
            results[i].region_name
        );
        var url = results[i].url;
        var getTickets = $("<a>")
          .attr("href", url)
          .text(" " + "Get Tickets Now!");

        resultsDiv.append(events);
        resultsDiv.append(start);
        resultsDiv.append(place);
        resultsDiv.append(getTickets);
        resultsDiv.append(newLine);

        $("#concerts").append(resultsDiv);
      }
      var header = $("<h1>");
      header.addClass("tracks");
      header.text("Upcoming Events");
      $("#concerts").prepend(header);
    });

    $.ajax({
      url: queryURL3,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var results = response.data;
      for (var i = 0; i < 5; i++) {
        var resultsDiv = $("<div>");

        var name = $("<p>").text(results[i].title);
        resultsDiv.append(name);
        $("#tracks").append(resultsDiv);
      }
      var header = $("<h1>");
      header.addClass("tracks");
      header.text("Top 5 Tracks");
      $("#tracks").prepend(header);
    });
  });
});
