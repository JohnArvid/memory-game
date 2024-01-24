document.addEventListener('DOMContentLoaded', () => {
  'use strict'
  const uiElements = {
    newGame: document.getElementById('nG'),
    nextRound: document.getElementById('nR'),
    message: document.getElementById('msg'),
    roundCount: document.getElementById('rndCnt'),
    cards: document.querySelectorAll('.card'),
  }

  const flipBackCards = () => document.querySelectorAll('.flipIt').forEach((card) => card.classList.remove('flipIt'));
  
  let roundsCnt = 0;
  let clickableCards = document.querySelectorAll(".flip");
  
  function enableAndFocusNextRound() {
    uiElements.nextRound.removeAttribute('disabled');
    uiElements.nextRound.focus();
  }

  function updateMessage(message) {
    uiElements.message.textContent = message;
  }
  //flip card triggered when clicked
  function checkCard() {
    var numFlipped = document.querySelectorAll(".flipIt").length; //check how many cards are flipped
    if (numFlipped < 2) {//if they are less than 2
      this.classList.add("flipIt"); //flip the clicked card
      numFlipped = document.querySelectorAll(".flipIt").length; //check how many cards are flipped
    }
    if (numFlipped == 2) {//when 2 or more are flipped:
      uiElements.cards.forEach((card) => card.classList.remove('flip'));//make them not flippable
      let flippedCards = document.querySelectorAll('.flipIt');//get the flipped cards
      var allFlipped = document.querySelectorAll('.flipIt img');//get the imgs on the flipped cards
      var arrImgs = Array.from(allFlipped);//make it an array
      var src1 = arrImgs[0].attributes.src.value;//get src value
      var src2 = arrImgs[1].attributes.src.value;//get src value
      clickableCards = document.querySelectorAll('.flip');

      if (src1 == src2) {//do the src match on flipped cards?
        //if so then add .success and remove flipIt class on flipped cards
        updateMessage("Success!");
        flippedCards.forEach((card) => card.classList.add('success'));
        flippedCards.forEach((card) => card.classList.remove('flip'));
        enableAndFocusNextRound();
      }
      else {//otherwise womp womp!
        //print msg and activate next round button
        updateMessage("Try again!");
        enableAndFocusNextRound();
      }
    }
    else {
      //if only one card is flipped, do nothing, wait for next card to be flipped
    }
  };


  //to reset the game and assign new imgs
  function newGame() {
    //ADD AN ALERT IF SOME CARDS ARE FLIPPED OR SUCCESS IS  MORE THAN 0 AND LESS THAN 16
    //IF NO DON'T
    //IF "YES" DO
    updateMessage("Click the cards!");
    roundsCnt = 0;

    uiElements.roundCount.textContent = "Number of rounds: ";
    uiElements.cards.forEach((card) => card.classList.remove('flipIt', 'success'));

    const myPix = ["assets/1.jpg",
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
    let imgSources = myPix;
    //to ensure each picture only gets chosen twice
    function getImage() {
      let rand = Math.floor(Math.random() * imgSources.length);
      let str = imgSources[rand];
      imgSources.splice(rand, 1);
      return str;
    }
    //run through all imgs and assign a src with getImage function
    function assignImgs() {
      for (i = 1; i < 17; i++) {
        let currentID = i;
        let img = document.getElementById(currentID);
    
        img.setAttribute('src', getImage());
      }
    }
    assignImgs();
    clickableCards.forEach((card) => card.addEventListener('click', checkCard)); //bind checkCard to clicking a card
  }
  //to initialize next round
  function nextRound() {
    flipBackCards();
    document.querySelectorAll('.success').forEach((card) => card.classList.remove('flip'));
    updateMessage(" ");//remove message
    uiElements.nextRound.setAttribute('disabled', true);
    roundsCnt++;//increment round count
    uiElements.roundCount.textContent = `Number of rounds: ${roundsCnt}`;
    var numberOfWin = document.querySelectorAll('.success').length;
    if (numberOfWin == 16) {
      uiElements.cards.forEach((card) => card.classList.remove('flip'));
      uiElements.nextRound.setAttribute('disabled', true);
      updateMessage("START NEW GAME?");
    }
    else {
      clickableCards = document.querySelectorAll(".flip");
      clickableCards.forEach((card) => card.addEventListener('click', checkCard)); //bind checkCard to clicking a card
    }
  }


  uiElements.newGame.addEventListener('click', newGame); //bind newGame to button
  uiElements.nextRound.addEventListener('click', nextRound); //bind nextRound to button
});
