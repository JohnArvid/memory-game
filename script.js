$( document ).ready(function() {
  //intialize counter for number of turns
  var roundsCnt = 0;
  //get all clickable cards
  var clickableCards = $(".flip");

  //flip card triggered when clicked
  function checkCard(){
    var numFlipped = $(".flipIt").length; //check how many cards are flipped
    if (numFlipped < 2){//if they are less than 2
      this.classList.add("flipIt"); //flip the clicked card
      numFlipped = $(".flipIt").length; //check how many cards are flipped
      }
      if (numFlipped == 2){//when 2 or more are flipped:
        $(".card").removeClass("flip");//make them not flippable
        var flippedCards = $(".flipIt");//get the flipped cards
        var allFlipped = $(".flipIt img");//get the imgs on the flipped cards
        var arrImgs = Array.from(allFlipped);//make it an array
        var src1 = arrImgs[0].attributes.src.value;//get src value
        var src2 = arrImgs[1].attributes.src.value;//get src value
        clickableCards = $(".flip");

        if (src1 == src2){//do the src match on flipped cards?
          //if so then add .success and remove flipIt class on flipped cards
          $("#msg").text("Success!");
          flippedCards.addClass("success");
          flippedCards.removeClass("flip");
          $("#nR").attr("disabled", false);
          $("#nR").focus();
          }
        else {//otherwise womp womp!
          //print msg and activate next round button
          $("#msg").text("Try again!");
          $("#nR").prop("disabled", false);
          $("#nR").focus();
          }
        }
      else {
        //if only one card is flipped, do nothing, wait for next card to be flipped
    }
  };
  

  //to reset the game and assign new imgs
  function newGame(){
    //ADD AN ALERT IF SOME CARDS ARE FLIPPED OR SUCCESS IS  MORE THAN 0 AND LESS THAN 16
    //IF NO DON'T
    //IF "YES" DO
    $("#msg").text("Click the cards!");//print message
    roundsCnt = 0;//reset round counter

    $("#rndCnt").text("Number of rounds: ");//print message
    $(".card").removeClass("flipIt success");//remove classes from previous game if any
    //$(".card").addClass("flip");
    //Array holding all image urls twice
    var myPix = ["assets/1.jpg",
    "assets/2.jpg",
    "assets/3.jpg",
    "assets/4.jpg",
    "assets/5.jpg",
    "assets/6.jpg",
    "assets/7.jpg",
    "assets/8.jpg",
    "assets/1.jpg",
    "assets/2.jpg",
    "assets/3.jpg",
    "assets/4.jpg",
    "assets/5.jpg",
    "assets/6.jpg",
    "assets/7.jpg",
    "assets/8.jpg"];
    var imgSources = myPix;
    //to ensure each picture only gets chosen twice
    function getImage(){
      var rand = Math.floor(Math.random() * imgSources.length);
      var str = imgSources[rand];
      imgSources.splice(rand,1);
      return str;
      }
    //run through all imgs and assign a src with getImage function
    function assignImgs(){
      for(i = 0; i < 16; i++){
      var currentID = "#" + i;
      var currentImg = "img" + currentID;
      var img = $(currentImg);
      img.attr('src', getImage());
      }
    }
    assignImgs();
    clickableCards.click(checkCard); //bind checkCard to clicking a card
  }
  //to initialize next round
  function nextRound(){
    $(".flipIt").removeClass("flipIt");//flip back the cards
    $(".success").removeClass("flip");
    $("#msg").text(" ");//remove message
    $("#nR").prop("disabled", true);//disable the button
    roundsCnt++;//iterate round count
    $("#rndCnt").text( "Number of rounds: " + roundsCnt);//print number of round
    var numberOfWin = $(".success").length;
      if (numberOfWin == 16){
        $(".card").removeClass("flip");
        $("#nR").prop("disabled", true);
        $("#msg").text("START NEW GAME?");
        }
      else{
        clickableCards = $(".flip");
        clickableCards.click(checkCard); //bind checkCard to clicking a card
      }
    }

    
    $("#nG").click(newGame); //bind newGame to button
    $("#nR").click(nextRound); //bind nextRound to button
});
