'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeButton = document.querySelector('.close-modal');
const showButtons = document.querySelectorAll('.show-modal');

function showModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

for (let i = 0; i < showButtons.length; i++) {
  showButtons[i].addEventListener('click', showModal);
}

closeButton.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
