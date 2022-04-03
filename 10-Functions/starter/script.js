'use strict';

// callback functions
const convertUppercase = str => str.toUpperCase();

const printName = (name, fn) => {
  console.log(`Capitalized name: ${fn(name)}`);
};

printName('Anish kaushal', convertUppercase);

// function returning function
const fullName = firstName => {
  return lastname => {
    console.log(`Full Name: ${firstName} ${lastname}`);
  };
};

const appendLastName = fullName('Anish');
appendLastName('Kaushal');
//-------OR------------//
fullName('Vinay')('Sharma'); // currying

// const num = {
//   6: 'six',
//   true: 'true',
// };
// console.log(num[true]);

//--------Calll, Apply Methods------//
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book('23E', 'DEL');
lufthansa.book('56D', 'BLR');

console.log(lufthansa);

const swiss = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
};

const book = lufthansa.book;
// call method to borrow functions
book.call(swiss, '45P', 'MUM');

// apply method can accept parameters as an array
const params = ['90F', 'CHN'];
book.apply(swiss, params);

// call equivalent to apply using spread operator
book.call(swiss, ...params);

console.log(swiss);

// bind method
// creates a copy and then later invoke like a normal function

const swissBooking = book.bind(swiss);
swissBooking('87e', 'Kaushal');
console.log(swiss);

// pass param while binding
const swissBookingYT = book.bind(swiss, 'YT5');
swissBookingYT('Utyi');

// Application of bind: with eventListner

// **Partial Application : means we can preset the value while using bind
lufthansa.planes = 250;
lufthansa.buyPlane = function () {
  console.log('this -->', this);
  this.planes++;
  console.log('planes', this.planes);
};

document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// IIFE - Immediately Invoked Function expression
// runs only once and anaonyous function

(function () {
  console.log("Hi, I'm IIFE");
})();

//-----Coding Challenge 1-----//
const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const input = Number(
      prompt(
        `${this.question}\n${poll.options.join('\n')}\n(Write option number)`
      )
    );
    if (input > 0 && input < 5) {
      this.answers[input]++;
    }
    this.displayResults();
    this.displayResults('string');
  },
  displayResults(type = 'array') {
    if (type === 'array') {
      console.log(this.answers);
    } else {
      console.log(`Poll results are ${this.answers.join(',')}`);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

// ---- Closures -----//

const secureBooking = () => {
  let passengerCount = 0;

  return () => {
    console.log(`${++passengerCount} passengers`);
  };
};

const booker = secureBooking();
booker();
booker();

secureBooking()();

let f;

const g = function () {
  let a = 10;
  f = function () {
    console.log(a * 10);
  };
};

const h = function () {
  let b = 999;
  f = function () {
    console.log(b + 1);
  };
};

g();
f();

f();
h();
f();
f();

// closures have priority over scope chain

(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';
  console.log('iife');
  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();

console.log('Anish'.slice(2));
