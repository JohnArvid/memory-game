'use strict';

document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const ui = {
    /* static ui elements */
    gameGrid: document.getElementById('game-grid'),
    newGame: document.getElementById('nG'),
    numberOfCards: document.getElementById('numberOfCards'),
    message: document.getElementById('msg'),
    roundCount: document.getElementById('rndCnt'),
    cards: document.querySelectorAll('.card'),
    /* dynamic ui elements */
    flippedCards: () => document.querySelectorAll('.flipIt'),
    clickableCards: () => document.querySelectorAll('.flip'),
    successCards: () => document.querySelectorAll('.success'),
  };

  /* needs to be updated whenever numerOfCards select element is changed
   + newGame is clicked */
  let numberOfCards = 16;

  function updateNumberOfCards() {
    numberOfCards = ui.numberOfCards.value;
    console.log(numberOfCards)
  }

  const roundCounter = {
    numberOfRounds: 0,
    increment: function () {
      this.numberOfRounds += 1;
    },
    reset: function () {
      this.numberOfRounds = 0;
    },
  };

  function flipBackCards() {
    ui.flippedCards().forEach((card) => card.classList.remove('flipIt'));
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
    if (e.target.parentElement.classList.contains('flip')) {
      flipCard(e);

      if (numFlipped() == 2) {
        let allFlipped = document.querySelectorAll('.flipIt i');
        let arrIs = Array.from(allFlipped);

        let icon1 = arrIs[0].className;
        let icon2 = arrIs[1].className;
        if (icon1 === icon2) {
          updateMessage('Success!');
          ui.flippedCards().forEach((card) => card.classList.add('success'));
          ui.flippedCards().forEach((card) => card.classList.remove('flip'));

          if (ui.successCards().length == numberOfCards) {
            setTimeout(nextRound, 2000);
          }
        } else {
          updateMessage('Try again!');
        }
      } else {
        nextRound();
        flipCard(e);
      }
    }
  }

  

  function newGame() {
    function initBoard(numberOfCards) {
      let squareRoot = Math.sqrt(numberOfCards);

      let iconWrapperId = 1;
      ui.gameGrid.textContent = '';

      for (let i = 1; i < squareRoot + 1; i++) {
        let row = document.createElement('div');
        row.id = 'row' + i;
        row.classList.add('row');
        ui.gameGrid.appendChild(row);

        for (let j = 1; j < squareRoot + 1; j++) {
          let card = document.createElement('div');
          card.classList.add('flip', 'card');

          let front = document.createElement('div');
          front.classList.add('front');

          let frontP = document.createElement('p');

          row.appendChild(card);
          card.appendChild(front);
          front.appendChild(frontP);

          let back = document.createElement('div');
          back.classList.add('back');
          let iconElement = document.createElement('i');
          iconElement.id = iconWrapperId++;
          iconElement.classList = ' ';
          card.appendChild(back);
          back.appendChild(iconElement);
        }
      }
    }
    //ADD AN ALERT IF SOME CARDS ARE FLIPPED OR SUCCESS IS MORE THAN 0 AND LESS THAN 16
    //IF NO DON'T
    //IF "YES" DO
    updateMessage('Click the cards!');
    roundCounter.reset();

    ui.roundCount.textContent = 'Number of rounds: ';
    // ui.cards.forEach((card) => (card.className = 'flip card'));

    const icons = [
      'fa-solid fa-brain',
      'fa-solid fa-marker',
      'fa-solid fa-walkie-talkie',
      'fa-solid fa-square-xmark',
      'fa-solid fa-phone',
      'fa-solid fa-envelope',
      'fa-solid fa-heart',
      'fa-solid fa-bomb',
      'fa-solid fa-comment',
      'fa-solid fa-pen-nib',
      'fa-solid fa-bell',
      'fa-solid fa-bolt',
      'fa-solid fa-ghost',
      'fa-solid fa-mug-hot',
      'fa-solid fa-pen',
      'fa-solid fa-video',
      'fa-solid fa-gear',
      'fa-solid fa-book',
      'fa-solid fa-circle-xmark',
      'fa-brands fa-react',
      'fa-brands fa-square-js',
      'fa-solid fa-clone',
      'fa-solid fa-yin-yang',
    ];

    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    }

    shuffleArray(icons);
    let shuffledIcons = icons.slice(0, numberOfCards / 2);
    const iconArr = [...shuffledIcons, ...shuffledIcons];

    function getIcon() {
      let rand = Math.floor(Math.random() * iconArr.length);
      let str = iconArr[rand];
      iconArr.splice(rand, 1);
      return str;
    }

    function assignIcons() {
      for (let i = 0; i < numberOfCards; i++) {
        let currentID = i + 1;
        let iconWrapper = document.getElementById(currentID);
        iconWrapper.className = '';
        let iconNames = getIcon().split(' ');
        for (let icon in iconNames) {
          iconWrapper.classList.add(iconNames[icon]);
        }
      }
    }

    initBoard(numberOfCards);
    assignIcons();

    ui.gameGrid.addEventListener('click', checkCard);
    ui.gameGrid.classList.remove('empty');
    ui.gameGrid.classList.add('active');
  }

  function nextRound() {
    flipBackCards();

    for (let card in ui.successCards().values) {
      card.classlist.remove('flip');
    }

    updateMessage(' ');
    roundCounter.increment();
    ui.roundCount.textContent = `Number of rounds: ${roundCounter.numberOfRounds}`;
    if (ui.successCards().length == 16) {
      ui.cards.forEach((card) => card.classList.remove('flip'));
      updateMessage('START NEW GAME?');
      ui.newGame.focus();
    }
  }

  ui.gameGrid.addEventListener('click', checkCard);
  ui.newGame.addEventListener('click', newGame);
  ui.numberOfCards.addEventListener('change', updateNumberOfCards);
});
