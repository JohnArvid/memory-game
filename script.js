document.addEventListener('DOMContentLoaded', () => {
  'use strict'
  const ui = {
    gameGrid: document.getElementById('game-grid'),
    newGame: document.getElementById('nG'),
    nextRound: document.getElementById('nR'),
    message: document.getElementById('msg'),
    roundCount: document.getElementById('rndCnt'),
    cards: document.querySelectorAll('.card'),
    flippedCards: () => document.querySelectorAll('.flipIt'),
    clickableCards: () => document.querySelectorAll(".flip")
  }

  const flipBackCards = () => {
    ui.flippedCards().forEach((card) => card.classList.remove('flipIt'))};
  
  let roundsCnt = 0;
  let clickableCards = document.querySelectorAll(".flip");
  
  function enableAndFocusNextRound() {
    ui.nextRound.removeAttribute('disabled');
    ui.nextRound.focus();
  }

  function updateMessage(message) {
    ui.message.textContent = message;
  }
  //flip card triggered when clicked
  function checkCard() {
    //check how many cards are flipped
    let numFlipped = ui.flippedCards().length; 
    if (numFlipped < 2) {
      this.classList.add("flipIt");
      numFlipped = ui.flippedCards().length; //check how many cards are flipped
    }
    if (numFlipped == 2) {//when 2 or more are flipped:
      ui.cards.forEach((card) => card.classList.remove('flip'));//make them not flippable
      // let flippedCards = document.querySelectorAll('.flipIt');//get the flipped cards
      let allFlipped = document.querySelectorAll('.flipIt img');//get the imgs on the flipped cards
      let arrImgs = Array.from(allFlipped);//make it an array
      let src1 = arrImgs[0].attributes.src.value;//get src value
      let src2 = arrImgs[1].attributes.src.value;//get src value
      // clickableCards = document.querySelectorAll('.flip');

      if (src1 == src2) {//do the src match on flipped cards?
        //if so then add .success and remove flipIt class on flipped cards
        updateMessage("Success!");
        ui.flippedCards().forEach((card) => card.classList.add('success'));
        ui.flippedCards().forEach((card) => card.classList.remove('flip'));
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

    ui.roundCount.textContent = "Number of rounds: ";
    ui.cards.forEach((card) => card.classList.remove('flipIt', 'success'));

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
      for (let i = 1; i < 17; i++) {
        let currentID = i;
        let img = document.getElementById(currentID);
    
        img.setAttribute('src', getImage());
      }
    }
    assignImgs();
    ui.clickableCards().forEach((card) => card.addEventListener('click', checkCard)); //bind checkCard to clicking a card
    ui.gameGrid.classList.remove('empty');
    ui.gameGrid.classList.add('active');

  }
  //to initialize next round
  function nextRound() {
    flipBackCards();
    document.querySelectorAll('.success').forEach((card) => card.classList.remove('flip'));
    updateMessage(" ");//remove message
    ui.nextRound.setAttribute('disabled', true);
    roundsCnt++;//increment round count
    ui.roundCount.textContent = `Number of rounds: ${roundsCnt}`;
    let numberOfWin = document.querySelectorAll('.success').length;
    if (numberOfWin == 16) {
      ui.cards.forEach((card) => card.classList.remove('flip'));
      ui.nextRound.setAttribute('disabled', true);
      updateMessage("START NEW GAME?");
    }
    else {
      // clickableCards = document.querySelectorAll(".flip");
      ui.clickableCards().forEach((card) => card.addEventListener('click', checkCard)); //bind checkCard to clicking a card
    }
  }


  ui.newGame.addEventListener('click', newGame); //bind newGame to button
  ui.nextRound.addEventListener('click', nextRound); //bind nextRound to button
});
