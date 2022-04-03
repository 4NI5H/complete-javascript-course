'use strict';
/* IMPORTANT 
 - JS ENgine - Call Stack + Heap
 - Call Stack -> has execution context to track the execution of them.
  -Heap -> stores all the objects 

  - For code, we have Execution contexts for the code
  1. Global Context - All variable, function declaration everything apart from code inside the functions
  2. Every Function gets their own execution context. 
    - Execution contxt -
        1. Variable Environment/ZOne
            - let, const, var declarations
            - functions 
            - arguments object
        2. Scope chain
        3. this keyword
 */

/* Scope
    - Scope chain - variabe lookup 
        child -> parent ---- yes  i.e. has access to variable in outer scope
        parent -> child --- no

    - let, const are block scoped
    - var is function scoped

*/

function calcAge(birthYear) {
  const age = 2022 - birthYear;

  function newAge() {
    let lastName = 'K1';
    console.log(`${firstName} ${lastName} age is ${age}`); // scope chain -> firstName is global variable so can be accessed

    if (age > 20) {
      var trait = 'MEN';
      let trait1 = 'MEN';

      function updateLastName() {
        lastName = 'yt';
        console.log(`${firstName} ${lastName} age is ${age}`);
      }
      updateLastName();
    } else {
      trait = 'KID'; // it can be updated because var is function scope not block scoped
      //   trait1 = 'KID'; // throws error as let is block scoped so it scope is only of if block
    }

    // console.log('trait1---', trait1);
    console.log('trait----', trait);

    // updateLastName();
    /*reference error as function is also block scope 
    but it will throw error only in strict mode */
  }
  newAge();
  return age;
}

const firstName = 'TR0Y';
calcAge(1991);

// console.log(age); // Reference error
// console.log(newAge()); // Reference error because functions are also block scope

//----- variable shadowing----//
function variableShadow() {
  let message = 'Hello , message here';
  var vmsg = 'Hello vmsg, can I be shadowed?';

  console.log(message);
  console.log(vmsg);

  if (true) {
    let message = 'Hi Shadow here'; //can be shadowd as let is block scoped
    // var message = 'Hi, var shadow is here'; // identifier already declared: can't be shadowed as var is function scoped

    // let vmsg = 'Hi let here, yes I can shadow';
    var vmsg =
      'Hi var here, I can also shadow you as var can be declared multiple time in same scope';
    console.log(message);
    console.log(vmsg);
  }
}
variableShadow();

// ----- this ------//

/* 
    -this keyword refers to owner of functionin which this is used
    -special keyword/variable that is created for evry executio context
    - this is not static i.e. its value depend on where it is called
*/

// ex1:
console.log(this); // window object

// regular method
const calcAgeThis = function (birthYear) {
  const age = 2022 - birthYear;
  console.log(this); // undefined in strict mode && window in non-strict
};
calcAgeThis(1991);

// arrow function -> this value depends on lexical scope
const calcAgeArrow = birthYear => console.log(this); // window because here the lexical scope for this is global
calcAgeArrow(1999);

// objects
const obj = {
  name: 'Anish',
  proffession: 'SE',
  checkProffession: function () {
    console.log(this.proffession);
  },
};

obj.checkProffession(); // outputs 'SE' as this refers to owner of function i.e object 'obj' i.e. object calling the method

const arrowObj = {
  name: 'Anish',
  proffession: 'SE',
  checkProffession: () => console.log(this.proffession),
};

arrowObj.checkProffession();

var a = { x: 1 };
var b = { x: 1 };
console.log(a != b);

const x = 6 % 2;
console.log(x ? 'ONE' : 'TWO');

var arr = ['dog', 'cat', 'mouse', 'horse'];
//

console.log(arr.splice(0, 2));

class x2 {
  get Y() {
    console.log('42');
  }
}
var X = new x2();
console.log(X.get());
