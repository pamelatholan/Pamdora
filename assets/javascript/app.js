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

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(response => {
      console.log(response);
      const results = response.articles;
      // This displays the searched artist's name as the header
      $("#artistInfo").text(artistName);
      results.forEach(item => {
        console.log(item);
        const resultsDiv = $("<div>");
        const p = $("<p>").text(item.description);
        const url = item.url;
        const linkTag = $("<a>")
          .attr("href", url)
          .text("click here for more info");
        resultsDiv.append(p);
        resultsDiv.prepend(linkTag);
        console.log(item.url);
        $("#articles").append(resultsDiv);
      });
    });
  });
});
