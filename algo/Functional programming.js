"use strict";

let result;

function magic(...args) {
  let sum = 0;
  // let sum = args.reduce((acc, num) => acc + num, 0);

  function innerMagic(...innerArgs) {
    sum += innerArgs.reduce((acc, num) => acc + num, 0);
    return innerMagic;
  }

  innerMagic.valueOf = function () {
    return sum;
  };

  return innerMagic(...args);
}

function magic2(...args) {
  let sum = args.reduce((acc, curr) => acc + curr, 0);

  function innerMagic(...innerArgs) {
    sum += innerArgs.reduce((acc, curr) => acc + curr, 0);
    return innerMagic;
  }

  innerMagic.valueOf = function () {
    return sum;
  };

  return innerMagic;
}

console.log(+magic()); // 0
console.log(+magic(5, 2, -8)); // -1
console.log(+magic(1, 2)(3, 4, 5)(6)(7, 10)); // 38
console.log(+magic(4, 8, 1, -1, -8)(3)(-3)(7, 2)); // 13
