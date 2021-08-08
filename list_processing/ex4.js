////////////////////////
// Leading Substrings //
////////////////////////

// Write a function that takes a string argument, and returns a list of all
// substrings that start from the beginning of the string, ordered from shortest
// to longest.

console.log(leadingSubstrings('abc'));      // ["a", "ab", "abc"]
console.log(leadingSubstrings('a'));        // ["a"]
console.log(leadingSubstrings('xyzzy'));    // ["x", "xy", "xyz", "xyzz", "xyzzy"]

function leadingSubstrings(str) {
  let substringArr = [];

  for (let idx = 1; idx <= str.length; idx += 1) {
    substringArr.push(str.slice(0, idx));
  }

  return substringArr;
}

// Solution

// function leadingSubstrings(string) {
//   let substrings = [];
//   for (let length = 1; length <= string.length; length += 1) {
//     substrings.push(string.slice(0, length));
//   }

//   return substrings;
// }

// Discussion
// This problem can be solved using the list processing functions. However doing
// so is needlessly complex. This is a situation where a for loop may
// be the most elegant solution. Given that approach, all we have to do is
// iterate through the input string and extract a list of the substrings of
// length 1, 2, 3, and so on starting at the beginning of the string.

// Further Exploration
// Rewrite leadingSubstrings using list processing functions. That is, convert
// the string into an array of some sort and use functions like map, filter, or
// reduce to get the desired substrings. (You will also need to use join.) Try
// not to use forEach as that is too similar to the for loop approach.