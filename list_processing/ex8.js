//////////////////
// Grocery List //
//////////////////

// Write a function that takes a grocery list (a two-dimensional array)
// with each element containing a fruit and a quantity, and returns a
// one-dimensional array of fruits, in which each fruit appears a number
// of times equal to its quantity.

// Example:
buyFruit([['apple', 3], ['orange', 1], ['banana', 2]]);
// returns ["apple", "apple", "apple", "orange", "banana", "banana"]

function buyFruit(groceries) {
  let returnArray = [];

  groceries.forEach(element => {
    for (let idx = 0; idx < element[1]; idx += 1) {
      returnArray.push(element[0]);
    }
  });

  return returnArray;
}

// Solution
// function buyFruit(fruitsList) {
//   return fruitsList
//     .map(fruit => repeat(fruit))
//     .reduce((groceryList, fruit) => groceryList.concat(fruit));
// }

// function repeat(fruitAndQuantity) {
//   let result = [];
//   let fruit = fruitAndQuantity[0];
//   let quantity = fruitAndQuantity[1];

//   for (let num = 0; num < quantity; num += 1) {
//     result.push(fruit);
//   }

//   return result;
// }

// Discussion
// To get the expected result, the solution makes use of two list processing
// strategies. The first is to transform the array elements into the expanded
// grocery list with each item repeated based on the quantity value (second
// element of each subarray). The second strategy is to flatten the array
// of arrays using a folding strategy, which flattens the array by
// consecutively concatenating each subarray together. The solution
// also makes use of a repeat helper function to facilitate the
// transformation of the original array's elements.