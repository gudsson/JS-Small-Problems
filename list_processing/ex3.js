////////////////////////
// Multiply All Pairs //
////////////////////////

// Write a function that takes two array arguments, each containing a list of
// numbers, and returns a new array containing the products of all combinations
// of number pairs that exist between the two arrays. The returned array should
// be sorted in ascending numerical order.

// You may assume that neither argument will be an empty array.

console.log(multiplyAllPairs([2, 4], [4, 3, 1, 2]));    // [2, 4, 4, 6, 8, 8, 12, 16]

function multiplyAllPairs(arr1, arr2) {
  let productArr = [];

  arr1.forEach(element => {
    for (let idx = 0; idx < arr2.length; idx += 1) {
      productArr.push(element * arr2[idx]);
    }
  });

  return productArr.sort((a, b) => a > b);
}

// Solution
// function multiplyAllPairs(array1, array2) {
//   let products = [];
//   array1.forEach(item1 => {
//     array2.forEach(item2 => {
//       products.push(item1 * item2);
//     });
//   });
//   return products.sort((item1, item2) => item1 - item2);
// }