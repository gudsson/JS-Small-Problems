////////////////////
// Sequence Count //
////////////////////

// Create a function that takes two integers as arguments. The first argument is a count, and the second is 
// the starting number of a sequence that your function will create. The function should return an array containing 
// the same number of elements as the count argument. The value of each element should be a multiple of the starting 
// number.

// You may assume that the count argument will always be an integer greater than or equal to 0. The starting 
// number can be any integer. If the count is 0, the function should return an empty array.

// Examples:
sequence(5, 1);          // [1, 2, 3, 4, 5]
sequence(4, -7);         // [-7, -14, -21, -28]
sequence(3, 0);          // [0, 0, 0]
sequence(0, 1000000);    // []

function sequence(len, multiple) {
  return console.log(Array(len).fill(1).map((e, idx) => multiple * (idx + 1)));
}

// Solution
// function sequence(count, startNum) {
//   let result = [];
//   for (let num = 1; num <= count; num++) {
//     result.push(num * startNum);
//   }
//   return result;
// }
// Discussion
// The solution uses a for loop to create the sequence and store it in the result array. The loop uses 
// the count argument to determine the appropriate number of iterations. During each iteration, we push the 
// product of num and the sequential multiplier assigned to startNum to the result array, After the loop, the 
// solution returns result.