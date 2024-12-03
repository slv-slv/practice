"use strict";

const fs = require("fs");

function User(a, b) {
  this.a = a;
  this.b = b;
}

const prot = {
  sayHi() {
    console.log("Hello!");
  },
};

class classUser {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  sayHi() {
    console.log("Hello!");
  }
}

const obj = new User(5, 7);
Object.setPrototypeOf(obj, prot);

const obj2 = new classUser(8, 9);

for (const prop in obj2) {
  console.log(prop);
}
