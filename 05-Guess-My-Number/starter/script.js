'use strict';

let secretNumber = Math.trunc(Math.random() * 20 + 1);

function updateMessage(message) {
  document.querySelector('.message').textContent = message;
}

function updateScore(count) {
  document.querySelector('.score').textContent = count;
}

function checkCountAndReturn(count) {
  if (count > 1) {
    return count - 1;
  } else return 0;
}

function updateStyle() {
  document.querySelector('body').style.backgroundColor = 'green';
  document.querySelector('.number').style.width = '30rem';
  document.querySelector('.number').textContent = secretNumber;
}

function reset() {
  //   window.location.reload();

  document.querySelector('.message').textContent = 'Start guessing again';
  secretNumber = Math.trunc(Math.random() * 20 + 1);
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.score').textContent = '20';
}

function updateHighScore(highScore, score) {
  if (highScore < score) {
    highScore = score;
    document.querySelector('.highscore').textContent = highScore;
  }
}

document.querySelector('.check').addEventListener('click', function () {
  const userInput = Number(document.querySelector('.guess').value);
  let score = Number(document.querySelector('.score').textContent);
  let highScore = 0;
  console.log(userInput);

  if (!userInput) {
    updateMessage('No Number Guessed...');
  } else if (userInput === secretNumber) {
    updateMessage('You guessed correctly! 👌✨');
    updateStyle();
    updateHighScore(highScore, score);
  } else if (userInput > secretNumber) {
    score = checkCountAndReturn(score);
    updateMessage('Your guess is high!');
    updateScore(score);
  } else if (userInput < secretNumber) {
    score = checkCountAndReturn(score);
    updateMessage('Your guess is low!');
    updateScore(score);
  }
});

document.querySelector('.again').addEventListener('click', reset);
