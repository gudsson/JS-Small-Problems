/////////////////////////
// Practice Problem 13 //
/////////////////////////

// Given the following data structure, sort the array so that
// the sub-arrays are ordered based on the sum of the odd numbers
// that they contain.

let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];
// Since 1 + 3 < 1 + 7 < 1 + 5 + 3, the sorted array should look like this:

// [ [ 1, 8, 3 ], [ 1, 6, 7 ], [ 1, 5, 3 ] ]

console.log(arr.sort((a, b) => {
  let aOddSum = a.filter(num => num % 2 === 1)
    .reduce((sum, next) => sum + next);
  let bOddSum = b.filter(num => num % 2 === 1)
    .reduce((sum, next) => sum + next);

  return aOddSum - bOddSum;
}));