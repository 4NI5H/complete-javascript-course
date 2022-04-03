let nam = "Anish";
console.log("name---", nam, "type", typeof nam);

let age = 23.5;
console.log("age---", age, "type", typeof age);

let jsisfun = true;
console.log("jsisfun", jsisfun, "type", typeof jsisfun);

// undefined -> typeof undefined is undefined
let und;
console.log("und---", und, "type", typeof und);

// type of null is object whis is a bug in js
console.log("type of null", typeof null);

// ========================================= //
// let, const , var

let ansLet;
ansLet = "Not found";
console.log("ans---", ansLet);

// const ansUnd; // const are immutable so can't be undefined.

const ansConst = "Immutable";
// ansConst = "Mutable"; // const can't be mutated so it will throw error

// making variable without assigning/defining datatype creates a property at global not at scope level
lastName = "Global";
console.log("global property", lastName);

// ================================================= //
//Operators

const present = 2022;
const ageAnish = present - 1998;
console.log(ageAnish, ageAnish / 20, 2 ** 3);

const bool = true;
const str = "true";

console.log(" == ", bool == str, "===", bool === str);

//====== Coding Challenge 1 ======

const massMark = 78;
const massJohn = 92;

const heightMark = 1.69;
const heightJohn = 1.95;

const BMI_Mark = massMark / heightMark ** 2;
const BMI_John = massJohn / heightJohn ** 2;

console.log("Mark BMI", BMI_Mark);
console.log("Mark John", BMI_John);

const bill = 275;

const tip = bill > 300 ? bill * 0.15 : bill * 0.1;
console.log(`bill : ${bill} and tip : ${tip}`);
