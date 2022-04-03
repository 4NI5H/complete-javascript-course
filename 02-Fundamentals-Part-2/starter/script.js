"use strict";

let change = true;
const canChange = true;

// if (canChange) changee = false;

console.log(change);

//----FUNCTIONS----//

// functionn declaration
function cartTotal(item1, item2) {
  return item1 + item2;
}

const totalBill = cartTotal(499, 599);
console.log("total cart bill", totalBill);

//function expression
const calcAge = function (birthYear) {
  return 2021 - birthYear;
};

const age = calcAge(1990);
console.log("age---", age);

// Note: We can call functions before they are declared but not in case of function expression

// arrow functiom

const fruitPieces = (fruitQty) => fruitQty * 4;

console.log("arrow =>", fruitPieces(4));

//-----Coding Challenge 1------//

const calAvg = (score1, score2, score3) => (score1 + score2 + score3) / 3;

const checkWinner = (avgDolphins, avgKoalas) => {
  if (avgDolphins >= 2 * avgKoalas) {
    console.log(`Dolphins win (${avgDolphins} vs. ${avgKoalas})`);
  } else if (avgKoalas > 2 * avgDolphins) {
    console.log(`Koalas win (${avgKoalas} vs. ${avgDolphins})`);
  } else {
    console.log("No team wins!");
  }
};

const avgDolphins = calAvg(44, 23, 71);
const avgKoalas = calAvg(65, 54, 49);
checkWinner(avgDolphins, avgKoalas);

//----- Arrays -----//

const friends = ["Micheal", "Steven", "Peter"];
console.log("friends----", friends);
//Add elements
friends.push("John"); // Adds element to end of array
console.log("friends add using push", friends);

friends.unshift("Harry"); // Add element to beginning of array
console.log("friends add using unshift", friends);

// remove element
friends.pop(); // Removes last element
console.log("friends removed using pop", friends);

friends.shift(); // Removes first element
console.log("friends removed using shift", friends);

///////////////////////////////////////
// ----- Coding Challenge 2-----//

const calcTip = (billValue) => {
  return billValue >= 50 && billValue <= 300
    ? billValue * 0.15
    : billValue * 0.2;
};

const bills = new Array(125, 555, 44);
console.log("bills: ", bills);

const tips = [calcTip(bills[0]), calcTip(bills[1]), calcTip(bills[2])];
console.log("tips: ", tips);

//-----Objects -----//

const person = {
  firtsName: "Anish",
  lastName: "K",
  job: "SDE",
  birthYear: 1999,
  calcAge: function () {
    this.age = 2021 - this.birthYear;
    return this.age;
  },
};

console.log(person.calcAge());
console.log(person.age);

//----Coding Challenge3 -----//

console.log("HIi");
const Mark = {
  fullName: "Mark Muller",
  mass: 78,
  height: 1.69,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};
console.log(Mark.fullName);
const John = {
  fullName: "John Smith",
  mass: 92,
  height: 1.95,
  calcBMI: function () {
    this.BMI = this.mass / this.height ** 2;
    return this.BMI;
  },
};
console.log(John.fullName);
if (Mark.calcBMI() > John.calcBMI()) {
  console.log(
    `${Mark.fullName} BMI (${Mark.BMI}) is higher than ${John.fullName}'s BMI (${John.BMI})`
  );
} else if (Mark.calcBMI() < John.calcBMI()) {
  console.log(
    `${John.fullName} BMI (${John.BMI}) is higher than ${Mark.fullName}'s BMI (${Mark.BMI})`
  );
}

// ----- Coding Challenge 4 -----//

const billsLoop = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];

const tips2 = [];
const totalBillVal = [];

for (let i = 0; i < billsLoop.length; i++) {
  const tip = calcTip(billsLoop[i]);
  tips2.push(tip);
  const total = billsLoop[i] + tip;
  totalBillVal.push(total);
}
console.log("bills---", billsLoop);
console.log("tips---", tips2);
console.log("totalBillValue---", totalBillVal);
