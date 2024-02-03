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
    clickableCards: () => document.querySelectorAll(".flip"),
    successCards: () => document.querySelectorAll('.success'),
  }

  const flipBackCards = () => {
    ui.flippedCards().forEach((card) => card.classList.remove('flipIt'))};
  
  const roundCounter = {
    numberOfRounds: 0, 
    increment: function(){
      this.numberOfRounds += 1;
    },
    reset: function(){
      this.numberOfRounds = 0;
    }
   };
  
  function enableAndFocusNextRound() {
    ui.nextRound.removeAttribute('disabled');
    ui.nextRound.focus();
  }

  function updateMessage(message) {
    ui.message.textContent = message;
  }

  function checkCard(e) {
    if (e.target.parentElement.classList.contains('flip')){
      let numFlipped = ui.flippedCards().length; 
      if (numFlipped < 2) {
        e.target.parentElement.classList.add('flipIt');
        numFlipped = ui.flippedCards().length;
      }
      if (numFlipped == 2) {
        // make cards not flippable
        for (let card in ui.cards.values) {
          card.classList.remove('flip');
        }
        let allFlipped = document.querySelectorAll('.flipIt i');
        let arrIs = Array.from(allFlipped);
        
        let icon1 = arrIs[0].className;
        let icon2 = arrIs[1].className;
        if (icon1 === icon2) {
          updateMessage("Success!");
          ui.flippedCards().forEach((card) => card.classList.add('success'));
          ui.flippedCards().forEach((card) => card.classList.remove('flip'));
          enableAndFocusNextRound();
        }
        else {
          updateMessage("Try again!");
          enableAndFocusNextRound();
        }
      }
    }
  };


  function newGame() {
    //ADD AN ALERT IF SOME CARDS ARE FLIPPED OR SUCCESS IS MORE THAN 0 AND LESS THAN 16
    //IF NO DON'T
    //IF "YES" DO
    updateMessage("Click the cards!");
    roundCounter.reset();

    ui.roundCount.textContent = "Number of rounds: ";
    ui.cards.forEach((card) => card.classList.remove('flipIt', 'success'));

    // Start of image assigning
    const icons = [
      'fa-solid fa-brain', 
      'fa-solid fa-marker',
      'fa-solid fa-walkie-talkie',
      'fa-solid fa-square-xmark',
      'fa-brands fa-react',
      'fa-brands fa-square-js',
      'fa-solid fa-clone',
      'fa-solid fa-yin-yang',
    ];

    const iconArr = [...icons, ...icons];

    // console.log(iconArr);

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

    // function getImage() {
    //   let rand = Math.floor(Math.random() * imgSources.length);
    //   let str = imgSources[rand];
    //   imgSources.splice(rand, 1);
    //   return str;
    // }

    function getIcon() {
      let rand = Math.floor(Math.random() * iconArr.length);
      let str = iconArr[rand];
      iconArr.splice(rand, 1);
      return str;
    }

    // function assignImgs() {
    //   for (let i = 1; i < 17; i++) {
    //     let currentID = i;
    //     let img = document.getElementById(currentID);
    
    //     img.setAttribute('src', getImage());
    //   }
    // }

    function assignIcons() {
      for (let i = 1; i < 17; i++) {
        let currentID = i;
        let iconWrapper = document.getElementById(currentID);
    
        iconWrapper.classList.add(getIcon());
      }
    }

    // assignImgs();
    assignIcons();

    // End of assigning images

    ui.gameGrid.addEventListener('click', checkCard);
    ui.gameGrid.classList.remove('empty');
    ui.gameGrid.classList.add('active');

  }

  //to initialize next round
  function nextRound() {
    flipBackCards();

    for (let card in ui.successCards().values) {
      card.classlist.remove('flip');
    }
    
    updateMessage(" ");
    ui.nextRound.setAttribute('disabled', true);
    roundCounter.increment();
    ui.roundCount.textContent = `Number of rounds: ${roundCounter.numberOfRounds}`;
    if (ui.successCards.length == 16) {
      ui.cards.forEach((card) => card.classList.remove('flip'));
      ui.nextRound.setAttribute('disabled', true);
      updateMessage("START NEW GAME?");
    }
    else {
      ui.gameGrid.addEventListener('click', checkCard);
      // ui.clickableCards().forEach((card) => card.addEventListener('click', checkCard)); //bind checkCard to clicking a card
    }
  }

  ui.gameGrid.addEventListener('click', checkCard);
  ui.newGame.addEventListener('click', newGame); //bind newGame to button
  ui.nextRound.addEventListener('click', nextRound); //bind nextRound to button
});
