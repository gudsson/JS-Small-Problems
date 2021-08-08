/////////////////
// Sum of Sums //
/////////////////

// Write a function that takes an array of numbers, and returns the sum of the
// sums of each leading subsequence for that array. You may assume that the
// array always contains at least one number.

// Examples:
sumOfSums([3, 5, 2]);        // (3) + (3 + 5) + (3 + 5 + 2) --> 21
sumOfSums([1, 5, 7, 3]);     // (1) + (1 + 5) + (1 + 5 + 7) + (1 + 5 + 7 + 3) --> 36
sumOfSums([4]);              // 4
sumOfSums([1, 2, 3, 4, 5]);  // 35

function sumOfSums(numArr) {
  let seqArray = [];

  for (let idx = 1; idx <= numArr.length; idx += 1) {
    seqArray.push(numArr.slice(0, idx));
  }

  return seqArray.map(element =>
    element.reduce((acc, ele) => acc + ele)).reduce((acc, ele) => acc + ele);
}

// Solution
// ** Solution 1 **
// function sumOfSums(numbers) {
//   let sumTotal = 0;
//   for (let idx = 1; idx <= numbers.length; idx++) {
//     sumTotal += numbers.slice(0, idx).reduce((accum, num) => accum + num);
//   }
//   return sumTotal;
// }

// ** Solution 2 **
// function sumOfSums(numbers) {
//   return numbers
//     .map((_, idx) =>
//       numbers.slice(0, idx + 1).reduce((sum, value) => sum + value)
//     )
//     .reduce((sum, value) => sum + value);
// }
// Discussion
// In the first solution we are iterating from 1 upto numbers.length and in
// each iteration we first slice the original array and then sum all the
// values from the created subarray using reduce, and finally add it to
// sumTotal.

// If we look at the example with array [3,5,2]. In the first iteration,
// subarray will be [3], sum of its values will also be 3 and sumTotal
// will be 0 + 3 which is 3 as well.

// In the second iteration, subarray will be [3,5], sum of its values
// will be 8 and sumTotal will now be 3+8 which is 11.

// In the final, third iteration, subarray will be [3,5,2], sum of its
// values will be 10 and sumTotal will be 11 + 10 which equals 21.

// The second solution can be bit tricky to look at. Let's break it
// down using a list processing approach so that it's easier to make
// sense of. Let's take a look at what happens when the array,
// [3, 5, 2], is passed as an argument:

// This solution first transforms the input array of numbers into its
// expanded form. Each element is mapped to a subarray containing a
// leading subsequence of elements from the input array. The length
// of each subarray is equal to the value of that subarray's index
// plus 1.
// Copy Code
// [[3], [3, 5], [3, 5, 2]]    // result from `slice`
// Next, the solution reduces the values of each subarray, adding
// them together to get their sum.
// Copy Code
// [3, 8, 10]                  // result from `map` and first `reduce`
// Finally, the solution reduces one more time. This time it adds all
// the sums together to get the sum of sums, and returns it.
// Copy Code
// 21                          // result from second `reduce`