'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const movs = sort
    ? movements.slice().sort((a, b) => a - b)
    : movements.slice();

  console.log(movs);
  movs.forEach(function (mov, i) {
    const transactionType = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${transactionType}">${
      i + 1
    } ${transactionType}</div>
    <div class="movements__value">${mov}</div>
  </div> `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const computeUsername = accounts => {
  accounts.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(user => user[0])
      .join('');
  });
};

const displayTotalBalance = account => {
  account.balance = account.movements.reduce((acc, mov) => {
    return acc + mov;
  }, 0);
  labelBalance.textContent = `${account.balance} EUR`;
};

const displayBalanceSumary = account => {
  const inflow = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, curr) => acc + curr);
  labelSumIn.textContent = `${inflow} EUR`;

  const outflow = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, curr) => acc + curr);
  labelSumOut.textContent = `${Math.abs(outflow)} EUR`;

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(dep => (dep * account.interestRate) / 100)
    .reduce((acc, curr) => acc + curr);
  labelSumInterest.textContent = `${interest} EUR`;
};

computeUsername(accounts);

let currentAccount;

// login implementation
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  // check pin
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // change the welcome message
    labelWelcome.textContent = `Welcome back ${currentAccount.owner}`;

    // show the ui
    containerApp.style.opacity = 100;

    // clear inputs and loose focus
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});

const updateUI = account => {
  // show the movements
  displayMovements(account.movements);

  // show total balance
  displayTotalBalance(account);

  // display balance summary
  displayBalanceSumary(account);
};

//transfer implementation

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const reciever = inputTransferTo.value;

  const recieverAccount = accounts.find(acc => acc.userName === reciever);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    amount <= currentAccount.balance &&
    recieverAccount &&
    recieverAccount?.userName !== currentAccount.userName
  ) {
    console.log('transfer');
    recieverAccount.movements.push(amount);
    currentAccount.movements.push(-amount);
    updateUI(currentAccount);
  }
});

// loan implemetation
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some(amt => amt >= loanAmount * 0.1)
  ) {
    currentAccount.movements.push(loanAmount);
    updateUI();
    inputLoanAmount.value = '';
  }
});

// closeAccount implementation
btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    console.log('delete');
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );
    // delete account
    accounts.splice(index, 1);

    // hide ui
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

// sort implementation
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// Array - slice method similar to that of string's slice method
// slice(a? , b?) // a inclusive, b exclusive

const arr = [...'Anish'];

console.log(arr.slice(1));
console.log(arr.slice(2, 4));

// splice works same as slice but it mutates the original arr

// console.log(arr.splice(1));
// console.log(arr); // ['A']

console.log(arr.splice(-1));
console.log(arr); // ['A','n', 'i','s'],

// at method to print element at particular index
arr.at(0); // 'A'
console.log(arr.at(-1)); // 's'

//-------Coding Challenge 1-------

const checkDogs = (dogsJulia, dogsKate) => {
  const actualDogsJulie = [...dogsJulia];
  actualDogsJulie.splice(0, 1);
  actualDogsJulie.splice(-2);

  const dogs = [...actualDogsJulie, ...dogsKate];
  dogs.forEach((d, i) => {
    if (d > 3) {
      console.log(`Dog ${i + 1} is an adult and dog is ${d} years old`);
    } else {
      console.log(`Dog ${i + 1} is a puppy and dog is ${d} years old`);
    }
  });
};

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

checkDogs(dogsJulia, dogsKate);

//map method

// filter method
const positiveMovement = movements.filter(mov => mov > 0);
console.log(positiveMovement);

// reduce method
const balance = movements.reduce((acc, mov) => {
  return acc + mov;
}, 0);
console.log('balance---', balance);

// ----Coding Challenge 3-----

const calcAverageHumanAge = ages => {
  const humanAge = ages.map(age => {
    if (age <= 2) {
      return age * 2;
    }
    return 16 + age * 4;
  });
  console.log(humanAge);

  const adultHumans = humanAge.filter(age => age > 18);
  const averageHumanAge = adultHumans.reduce((acc, curr, i, arr) => {
    return acc + curr / arr.length;
  }, 0);
  // const averageHumanAge = totalHumanAge / adultHumans.length;
  console.log('average age', averageHumanAge);
};
calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);

// calcAverageHumanAge using chaining
const calcAverageHumanAge2 = ages => {
  const averageAge = ages
    .map(age => {
      if (age <= 2) {
        return age * 2;
      }
      return 16 + age * 4;
    })
    .filter(age => age > 18)
    .reduce((acc, curr, _, arr) => {
      return acc + curr / arr.length;
    }, 0);

  console.log('chaining average age', averageAge);
};
calcAverageHumanAge2([5, 2, 4, 1, 15, 8, 3]);

//Array.from

const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// Coding Challenge 4

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

dogs.forEach(dog => {
  dog.rcmdFood = Math.trunc(dog.weight ** 0.75 * 28);
});
console.log(dogs);

const Sarah_Dog = dogs.find(dog => dog.owners.includes('Sarah'));
Sarah_Dog.curFood < Sarah_Dog.rcmdFood
  ? console.log('Eating too low')
  : console.log('Eating too much');

const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.rcmdFood)
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.rcmdFood)
  .flatMap(dog => dog.owners);

console.log(`${ownersEatTooMuch.join(' and ')}'s eat too much`);
console.log(`${ownersEatTooLittle.join(' and ')}'s eat too little`);

dogs.some(dog => dog.curFood === dog.rcmdFood);

const checkEatingOkay = dog =>
  dog.curFood > dog.rcmdFood * 0.9 && dog.curFood < dog.rcmdFood * 1.1;

console.log(dogs.some(checkEatingOkay));

console.log(parseInt('20p20S'));

// random integer b/w range
let max = 20;
let min = 10;

console.log(Math.trunc(Math.random() * (max - min) + 1) + min);

console.log(Math.round(23.5));
