'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

// Spread -- right side of assignment operator
const arr = [1, 2, ...[3, 4]];
console.log(arr);

// Rest --- left side of assignment operator
const [a, b, ...rest] = [1, 2, 3, 3, 4, 5];
console.log(a, '  ', b, ' ', rest);

// swapping array

let [primary, secondary] = restaurant.mainMenu;
console.log('before switch', primary, secondary);

[primary, secondary] = [secondary, primary];
console.log('after switch', primary, secondary);

const { fri, ...restDays } = restaurant.openingHours;

console.log('rest days', restDays);

// Short-Circuiting ( '||' operator short circuit and returns the first truthy value)
console.log(null || undefined); // undefined
console.log(0 || 'zero'); // zero
console.log('0' || 0);
console.log(0 || '' || undefined || 'Short Circuit' || 'HI'); // 'Short Circuit'

// ------ AND && -------//
// Short circuits and returns the first falsy value
console.log('---AND---');
console.log(0 && 'zero'); // 0
console.log('Heloo' && 'One' && '' && 0); // empty string

//----Nullish Coalescing---//
const totalGuests = 0;
const guests = totalGuests || 10;
// nullish values over falsy values ( only null & undefined)
const correctGuests = totalGuests ?? 10;
console.log('guest', guests, '\n nullish coalescing corect', correctGuests);

// ----- for of loop ----- //
const menu = [...restaurant.starterMenu, '', ...restaurant.mainMenu];

for (const item of menu) {
  console.log('item', item);
}

for (const item of menu.entries()) {
  console.log('item entries', item);
}

for (const [i, el] of menu.entries()) {
  console.log(i + 1, ':', el);
}

// ----coding challenge 1----- //
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

const [players1, players2] = game.players;
console.log(players1, players2);

const [gk, ...fieldPlayers] = players1;

const allPlayers = [...players1, ...players2];

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Periscic'];

const { team1, x: draw, team2 } = game.odds;

const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scord`);
};
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

team1 < team2 && console.log('team1 wins');
team1 > team2 && console.log('team2 wins');

// ==== Coding Challenge 2 ---//

for (const [i, el] of game.scored.entries()) {
  console.log(`Goal ${i + 1}: ${el}`);
}

const odds = Object.values(game.odds);
console.log('odds value', odds);
let sum = 0;
for (const odd of odds) {
  sum += odd;
}
const average = sum / odds.length;
console.log('average', average);

console.log(Object.entries(game.odds));
for (const [key, value] of Object.entries(game.odds)) {
  const teamName = key === 'x' ? 'draw' : `victory ${game[key]} :`;
  console.log(`Odd of ${teamName} ${value}`);
}

const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}
console.log(scorers);

//-----SETS-----//

const orderSet = new Set(['Pizza', 'Pasta', 'Pizza', 'Risotto', 'Pasta']);
console.log('set of arrays', orderSet);

const strSet = new Set('Jonas'); // {'J', 'o', 'n', 'a', 's'}
console.log('set of strings', strSet);

console.log(orderSet.size); // length/size of set
console.log(orderSet.has('Pizza')); // to check if element exists in set
console.log(orderSet.add('Garlic Bread'));
orderSet.delete('Risottoo');
console.log(orderSet);

const orderMap = new Map();
orderMap.set('anish', 'kaushal');
orderMap.set(1, 'wewe');
orderMap.set(true, 'Yay wewe');

console.log(orderMap.get(1));

// ------- Coding Challenge 3------//

const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);

const events = [...new Set(...gameEvents.values())];
console.log('events', events);

gameEvents.delete(64);
console.log(gameEvents);

for (const [key, value] of gameEvents) {
  if (key < 45) console.log(`[FIRST HALF] ${key}: ${value}`);
  else console.log(`[SECOND HALF] ${key}: ${value}`);
}

//------Coding Challenge 4------
/* 
Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.

The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.

THIS TEST DATA (pasted to textarea)

underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const row = text.split('\n');
  // const modifiedText = [];
  for (const [i, element] of row.entries()) {
    let convertedText = convertSnakeCaseToCamelCase(element);
    // modifiedText.push(convertedText);
    console.log(
      convertedText.trim().padEnd(20, ' ') + '✅'.repeat(i + 1) + '\n'
    );
  }
});

function convertSnakeCaseToCamelCase(str) {
  const [firstVariableName, secondVariableName] = str.split('_');
  return (
    firstVariableName.toLowerCase() +
    secondVariableName[0].toUpperCase() +
    secondVariableName.slice(1).toLowerCase()
  );
}
