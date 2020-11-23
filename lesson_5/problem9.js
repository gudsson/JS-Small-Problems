////////////////////////
// Practice Problem 9 //
////////////////////////

// Given the following data structure, return a new array with the same
// structure, but with the subarrays ordered -- alphabetically or
// numerically as appropriate -- in ascending order.

let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

console.log(arr.map(subArr => {
  if (typeof subArr[0] === 'string') {
    return subArr.slice().sort();
  } else {
    return subArr.slice().sort((a, b) => a - b);
  }
}));