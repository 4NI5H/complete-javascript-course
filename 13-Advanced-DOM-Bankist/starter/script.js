'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// scroll to features

btnScroll.addEventListener('click', function () {
  const coordinates = section1.getBoundingClientRect();

  // old way
  // window.scrollTo({
  //   left: coordinates.left,
  //   top: coordinates.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  /* new way */
  section1.scrollIntoView({ behavior: 'smooth' });
});

// eventDelegation
// Page navigation
// 1. Add eventListner to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

function handleHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const allLinks = link.closest('.nav').querySelectorAll('.nav__link');

    allLinks.forEach(alllink => {
      if (alllink !== link) alllink.style.opacity = this;
    });
  }
}

// faded effect on nav links

document
  .querySelector('.nav')
  .addEventListener('mouseover', handleHover.bind(0.5));

document
  .querySelector('.nav')
  .addEventListener('mouseout', handleHover.bind(1));

// intersection observer Aimplementation
// condition:when the header section is gone i.e. is not intersecting with the
// section viewport
// new IntersectionObserver(callback. option)
// observe(element) method to have the observer API work
// callback function recieves two params callback(entries, observer)

const observer = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, // basically header should be gone out
});

function stickyNav(entries) {
  const [entry] = entries;
  console.log(entry);
  // when header doesn't intersect with viewport add sticky class
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
}

// way to use the IntersectionObserver object
observer.observe(header);

//========================================================================//
// showing sections on scroll

const sectionObserver = new IntersectionObserver(showSection, {
  root: null,
  threshold: 0.1, // 10% intersection
});

const sections = document.querySelectorAll('section');
sections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// callback function
function showSection(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');

  // unobserve
  observer.unobserve(entry.target);
}

//===========================================================//
// Lazy Loading

const imgTargets = document.querySelectorAll('img[data-src]');

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.05,
});

imgTargets.forEach(img => imgObserver.observe(img));

function loadImg(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}
