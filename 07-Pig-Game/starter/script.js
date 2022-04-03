'use strict';

// player elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// player scores element
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');

// current score element
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');

// dice element
const dice = document.querySelector('.dice');

console.log(document.querySelector('p.score'));
/* initial coses 
1. hide dice
2. set player score and current score to 0
*/
let currentScore = 0,
  activePlayer = 0,
  scores = [0, 0],
  playing = true;
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

function rollDice() {
  if (playing) {
    const diceValue = Math.trunc(Math.random() * 6 + 1);
    dice.classList.remove('hidden');
    dice.src = `dice-${diceValue}.png`;

    if (diceValue != 1) {
      currentScore += diceValue;
      console.log();
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
}

function holdScore() {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 50) {
      dice.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      playing = false;
    } else {
      switchPlayer();
    }
  }
}

function reset() {
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  score0.textContent = 0;
  score1.textContent = 0;
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
  current0.textContent = 0;
  current1.textContent = 0;
  activePlayer = 0;
  currentScore = 0;
  dice.classList.add('hidden');
}

// roll eventListner
document.querySelector('.btn--roll').addEventListener('click', rollDice);

// hold eventListner
document.querySelector('.btn--hold').addEventListener('click', holdScore);

// new game eventListner
document.querySelector('.btn--new').addEventListener('click', reset);
