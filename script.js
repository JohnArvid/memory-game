document.addEventListener('DOMContentLoaded', () => {
  'use strict'
  const ui = {
    gameGrid: document.getElementById('game-grid'),
    newGame: document.getElementById('nG'),
    message: document.getElementById('msg'),
    roundCount: document.getElementById('rndCnt'),
    cards: document.querySelectorAll('.card'),
    flippedCards: () => document.querySelectorAll('.flipIt'),
    clickableCards: () => document.querySelectorAll('.flip'),
    successCards: () => document.querySelectorAll('.success'),
  };

  const numberOfCards = 16;

  const roundCounter = {
    numberOfRounds: 0, 
    increment: function(){
      this.numberOfRounds += 1;
    },
    reset: function(){
      this.numberOfRounds = 0;
    }
   };

  function flipBackCards() {
    ui.flippedCards().forEach((card) => card.classList.remove('flipIt'))
  }

  function updateMessage(message) {
    ui.message.textContent = message;
  }

  function numFlipped() {
    return ui.flippedCards().length;
  }

  function flipCard(e) {
    e.target.parentElement.classList.add('flipIt');
  }

  function checkCard(e) {
    if (e.target.parentElement.classList.contains('flip')){
      flipCard(e);

      if (numFlipped() == 2) {
        
        let allFlipped = document.querySelectorAll('.flipIt i');
        let arrIs = Array.from(allFlipped);
        
        let icon1 = arrIs[0].className;
        let icon2 = arrIs[1].className;
        if (icon1 === icon2) {
          updateMessage("Success!");
          ui.flippedCards().forEach((card) => card.classList.add('success'));
          ui.flippedCards().forEach((card) => card.classList.remove('flip'));

          console.log(ui.successCards().length);

          if (ui.successCards().length == numberOfCards) {
            setTimeout(nextRound, 2000);
          }
        }
        else {
          updateMessage("Try again!");
        }
      }
      else {
        nextRound();
        flipCard(e);
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
    ui.cards.forEach((card) => card.className = 'flip card');

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
      // Expand list
    ];

    // Build randomizer to pick n from icons
    // Save in new arr that is copied and doubled in iconArr

    const iconArr = [...icons, ...icons];

    function getIcon() {
      let rand = Math.floor(Math.random() * iconArr.length);
      let str = iconArr[rand];
      iconArr.splice(rand, 1);
      return str;
    }

    function assignIcons() {
      for (let i = 1; i < 17; i++) {
        let currentID = i;
        let iconWrapper = document.getElementById(currentID);
        let iconNames = getIcon().split(' ');
        for (let icon in iconNames) {
          iconWrapper.classList.add(iconNames[icon]);
        }
      }
    }

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
    roundCounter.increment();
    ui.roundCount.textContent = `Number of rounds: ${roundCounter.numberOfRounds}`;
    if (ui.successCards().length == 16) {
      ui.cards.forEach((card) => card.classList.remove('flip'));
      updateMessage("START NEW GAME?");
    }
    else {
      ui.gameGrid.addEventListener('click', checkCard);
    }
  }

  ui.gameGrid.addEventListener('click', checkCard);
  ui.newGame.addEventListener('click', newGame); //bind newGame to button
});
