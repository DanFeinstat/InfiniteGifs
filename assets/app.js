$(document).ready(function(){

  var topics = ["happy", "laughing", "angry", "confused", "rejected"];
  //trendData array is to hold user selections for later study
  var trendData = [];

  for(var i = 0; i<topics.length; i++){
    $(".btnDisplay").append("<button class='btn gifBtn mx-1 mt-1 border' value='"+topics[i]+"'>"+topics[i]+"</button>");
  }

  $('.btnDisplay').on('click', '.gifBtn', function(){
    //Clear any previous gifs
    $(".gifDisplay").empty();
    var searchTerm = $(this).attr("value");
    console.log(searchTerm);
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=AmiNrBH5UccJqywSypgFY4IaixHeBgpe&limit=10&rating=pg&q="+searchTerm;
    console.log(queryURL);
    //get a selection of 10 gifs from the Giphy api using our search term
    $.ajax({
      url:queryURL,
      method:"GET"
    }).then(function(response){
      for(var i = 0; i<response.data.length; i++){
        $(".gifDisplay").append('<div class="card float-left mx-2 mt-2 mb-2" style="width:'
        +response.data[i].images.fixed_height_still.width
        +'px; height:245px;"><img class"card-img-top" src='
        +response.data[i].images.fixed_height_still.url+
        ' animated='
        +response.data[i].images.fixed_height.url+' alt="gif">\
        <div class="card-body"><p class="card-text text-center">rated:"'
        +response.data[i].rating+'"</p></div></div>');
      }
    })
  });
  //variable for our hover function
  var hoverURL = "";
  //function that causes the animated gif to play when still image is hovered
  //moving the mouse off the image will stop the gif from playing
  $(".gifDisplay").on("mouseenter","img",function(){
    hoverURL = $(this).attr("src");
    $(this).attr("src",$(this).attr("animated"));
  })
  $(".gifDisplay").on("mouseleave","img",function(){
    $(this).attr("src",hoverURL);
  })
  //create a new button based on user input
  $("#submit").on("click", function(){
    event.preventDefault();
    var newBtn = $("#newTheme").val().trim();
    //We push newBtn value to trendData so we can study user preference trends
    //trendData is not currently in use with this project
    trendData.push(newBtn);
    $(".btnDisplay").append("<button class='btn gifBtn mx-1 mt-1 border' value='"
    +newBtn+"'>"
    +newBtn+"</button>");
  })



})
