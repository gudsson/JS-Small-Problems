/////////////////////////
// Practice Problem 10 //
/////////////////////////

// Perform the same transformation of sorting the subarrays we did in
// the previous exercise with one difference; sort the elements in
// descending order.

let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

console.log(arr.map(subArr => {
  if (typeof subArr[0] === 'string') {
    return subArr.slice().sort().reverse();
  } else {
    return subArr.slice().sort((a, b) => b - a);
  }
}));