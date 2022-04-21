'use strict';

//Coding Challenge 1

const Car = function (maker, speed) {
  (this.maker = maker), (this.speed = speed);
};

Car.prototype.accelarate = function () {
  this.speed += 10;
  console.log(`${this.maker} going at ${this.speed}`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.maker} going at ${this.speed}`);
};
const c1 = new Car('BMW', 20);
const c2 = new Car('Audi', 100);

console.log(c1);
c1.accelarate();
console.log(c1);
c1.accelarate();
c2.accelarate();

c1.brake();

c2.accelarate();

// Coding Challenge 2

class CarCl {
  constructor(maker, speed) {
    this.maker = maker;
    this.speed = speed;
  }

  accelarate() {
    this.speed += 10;
    console.log(`${this.maker} going at ${this.speed} km/h`);
  }

  brake() {
    this.speed -= 10;
    console.log(`${this.maker} going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }
  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
const car1 = new CarCl('FORD', 120);
console.log(car1);
console.log(car1.speedUS);
car1.speedUS = 100;
console.log(car1.speed);

// Coding challneg 3

const EV = function (maker, speed, charge) {
  Car.call(this, maker, speed);
  this.charge = charge;
};
// Link prototypes
EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `${this.maker} going at ${this.speed}, with a charge of ${this.charge}%`
  );
};

const Tesla = new EV('Tesla', 120, 30);
Tesla.chargeBattery(90);
console.log(Tesla);
Tesla.accelerate();
Tesla.brake();

// Coding Challenge 4

class EVCl extends CarCl {
  #charge;
  constructor(maker, speed, charge) {
    super(maker, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelarate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `${this.maker} going at ${this.speed}, with a charge of ${this.#charge}%`
    );
    return this;
  }
}
const rivian = new EVCl('Rivian', 120, 23);
// console.log(rivian);
rivian.chargeBattery(90);
console.log(rivian.accelarate());

rivian.chargeBattery(100).accelarate().brake().accelarate().chargeBattery(98);
