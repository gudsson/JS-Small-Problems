let myNumbers = [1, 4, 3, 7, 2, 6];
// => [2, 8, 6, 14, 4, 12]

doubleNumbers(myNumbers);
console.log(myNumbers);

// code a function that mutates the original array
function doubleNumbers(numArr) {
  let digits = numArr.length;

  for (let idx = 0; idx < digits; idx += 1) {
    numArr.push(numArr.shift() * 2);
  }
  return console.log(numArr);
}