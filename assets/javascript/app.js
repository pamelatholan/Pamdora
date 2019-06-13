$("#search-button").on("click", function() {
  event.preventDefault();
  // This line grabs the input from the textbox


  var artistName = $("#artist-input").val().trim();

  var queryURL = "https://newsapi.org/v2/everything?q="+ artistName +"&apiKey=787c8e2866844a7c94f18cfad8f6bc06&tot&pageSize=4";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then((response)=> {
   console.log(response);
   const results = response.articles;
   results.forEach((item)=> {
       console.log(item)
       const resultsDiv = $('<div>')
       const p = $('<p>').text(item.description)
       const url = item.url
       const linkTag = $('<a>').attr('href', url).text('click here for more info')
       resultsDiv.append(p)
       resultsDiv.prepend(linkTag)
       console.log(item.url)
       $('#articles').append(resultsDiv)
   })   
  })
  })
      
