/////////////////////////////
// Sum Square - Square Sum //
/////////////////////////////

// Write a function that computes the difference between the square of the sum
// of the first count positive integers and the sum of the squares of the first
// count positive integers.

function sumSquareDifference(num) {
  let digits = getDigitArray(num);
  let squareSum = (digits.reduce((sum, val) => sum + val)) ** 2;
  let sumSquares = digits.map(val => val ** 2).reduce((sum, val) => sum + val);
  return squareSum - sumSquares;
}

function getDigitArray(num) {
  let arr = [];
  for (let idx = 1; idx <= num; idx++) {
    arr.push(idx);
  }
  return arr;
}

// Examples:
console.log(sumSquareDifference(3));    // 22 --> (1 + 2 + 3)**2 - (1**2 + 2**2 + 3**2)
console.log(sumSquareDifference(10));    // 2640
console.log(sumSquareDifference(1));    // 0
console.log(sumSquareDifference(100));    // 25164150