$(document).ready(function(){


$("#search-button").on("click", function() {
  event.preventDefault();
  // This line grabs the input from the textbox


  var artistName = $("#artist-input").val().trim();
  var queryURL = "https://newsapi.org/v2/everything?q="+ artistName +"&apiKey=787c8e2866844a7c94f18cfad8f6bc06&tot&pageSize=4";
  var queryURL2 = "http://api.eventful.com/json/events/search?...&keywords=" + artistName + "&app_key=txM6TBSz6KpmbjwL";
  var queryURL3 = "https://api.deezer.com/search?q=" + artistName + "&app_id=98cc6f86bc10e03d8a5e760d8d5f6491";

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
    method: "GET",
  }).then(function(response){

    console.log(response);

  })


  })

  
      
})