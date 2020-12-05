/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
///////////////////
// Binary Search //
///////////////////

// It is quite common to find yourself in a situation where
// you need to perform a search on some data to find
// something you're looking for. Imagine that you need
// to search through the yellow pages to find the phone
// number of a particular business. A straightforward
// way to do this would be to go through the yellow
// pages one business at a time, checking if the
// current business name is the one you're trying
// to find.

// This may be a simple and easy way to search, but it's
// not very efficient. In the worst case scenario, it
// could mean having to search through every single
// business name before finding out that the business
// isn't listed—or, slightly better, having to go through
// every letter from 'A' to 'Z' before finding the business.
// A linear search such as this can take quite a long time.

// A binary search algorithm is a much more efficient
// alternative. This algorithm allows you to cut the
// search area in half on each iteration by discarding
// the half that you know your search term doesn't exist
// in. The binary search algorithm is able to do this by
// relying on the data being sorted. Going back to the
// yellow pages example, let's say that we're searching
// the following yellowPages data for the search item
// 'Pizzeria':

// Yellow pages list of business names data:
// let yellowPages = ['Apple Store',
//                    'Bags Galore',
//                    'Bike Store',
//                    'Donuts R Us',
//                    'Eat a Lot',
//                    'Good Food',
//                    'Pasta Place',
//                    'Pizzeria',
//                    'Tiki Lounge',
//                    'Zooper'];
// With a linear search, we would have to sequentially go
// through each of the items until we found the search
// item 'Pizzeria'. In a binary search, however, the
// following sequence happens:

// Retrieve the middle value from the data (assume truncation
//   to integer) --> 'Eat a Lot'.
// If the middle value is equal to 'Pizzeria', stop the search.
// If the middle value is less than 'Pizzeria':
// Discard the lower half, including the middle
// value --> ['Apple Store', 'Bags Galore', 'Bike Store',
// 'Donuts R Us', 'Eat a Lot'].
// Repeat the process from the top, using the upper half
// as the starting data --> ['Good Food', 'Pasta Place',
// 'Pizzeria', 'Tiki Lounge', 'Zooper'].
// If the middle value is greater than 'Pizzeria', do the
// same as the previous step, but with opposite halves.
// Using the process described above, the search successfully
// ends on the second iteration when the middle value is
// 'Pizzeria'.

// Implement a binarySearch function that takes an array and
// a searchItem as arguments, and returns the index of the
// searchItem if found, or -1 otherwise. You may assume
// that the array argument will always be sorted.

function binarySearch(arr, searchItem) {
  let idx = 0;
  let testArr = arr;

  while (testArr.length) {
    let middle = Math.floor(testArr.length / 2);

    if (testArr[middle] === searchItem) {
      idx += middle;
      return idx;
    } else if (testArr[middle] < searchItem) {
      idx += middle + 1;
      testArr = testArr.slice(middle + 1);
    } else {
      testArr = testArr.slice(0, middle);
    }
  }
  return -1;
}

// Examples:
let yellowPages = ['Apple Store', 'Bags Galore', 'Bike Store', 'Donuts R Us', 'Eat a Lot', 'Good Food', 'Pasta Place', 'Pizzeria', 'Tiki Lounge', 'Zooper'];
console.log(binarySearch(yellowPages, 'Pizzeria'));                   // 7
console.log(binarySearch(yellowPages, 'Apple Store'));                // 0

console.log(binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 77));    // -1
console.log(binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 89));    // 7
console.log(binarySearch([1, 5, 7, 11, 23, 45, 65, 89, 102], 5));     // 1

console.log(binarySearch(['Alice', 'Bonnie', 'Kim', 'Pete', 'Rachel', 'Sue', 'Tyler'], 'Peter'));  // -1
console.log(binarySearch(['Alice', 'Bonnie', 'Kim', 'Pete', 'Rachel', 'Sue', 'Tyler'], 'Tyler'));  // 6