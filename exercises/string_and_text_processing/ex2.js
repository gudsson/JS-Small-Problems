///////////////////
// Delete Vowels //
///////////////////

// Write a function that takes an array of strings, and
// returns an array of the same values with all vowels
// (a, e, i, o, u) removed.

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

// Examples:
removeVowels(['abcdefghijklmnopqrstuvwxyz']);         // ["bcdfghjklmnpqrstvwxyz"]
removeVowels(['green', 'YELLOW', 'black', 'white']);  // ["grn", "YLLW", "blck", "wht"]
removeVowels(['ABC', 'AEIOU', 'XYZ']);                // ["BC", "", "XYZ"]

function removeVowels(arr) {
  let result = [];

  arr.forEach(ele1 => {
    result.push(ele1.split('').map(ele2 => {
      if (!VOWELS.includes(ele2.toLowerCase())) {
        return ele2;
      } else {
        return '';
      }
    }).join(''));
  });

  return console.log(result);
}

// Approach/Algorithm
// You can look at this exercise as containing two parts. The first part is
// transforming the array argument into another array. The second part is
// processing the strings and transforming them into new strings that do
// not have vowels. Note that the first part is dependent on the result
// of the second part (Hint: think "nested").

// Solution
// ** Solution 1 **
// function removeVowels(strings) {
//   return strings.map(string => string.replace(/[aeiou]/gi, ""));
// }

// ** Solution 2 **
// function removeVowels(stringArray) {
//   return stringArray.map(string => {
//     let chars = string.split("");
//     let removedVowels = deleteVowels(chars);
//     return removedVowels.join("");
//   });
// }

// function deleteVowels(array) {
//   const VOWELS = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
//   return array.map(char => {
//     if (VOWELS.indexOf(char) >= 0) {
//       return "";
//     } else {
//       return char;
//     }
//   });
// }
// Discussion
// The first solution uses String.prototype.replace() method to remove
// all of the vowels from each string. We use map() to iterate through
// the array since it is ideal for transformations like this.

// In the second solution, we have used helper function deleteVowels
// which removes all the vowels from the given array. In the removeVowels
// function, we are calling map method on given array of strings. This
// method returns a new array with all the elements of the original
// array transformed based on the return value of the callback function.
// Within the callback function we are splitting the string into array of
// characters, removing all the vowels from this array using our helper
// deleteVowels function and finally joining this new array into string
// again and returning it from the function.

// If we compare first and second solution we can see how much regex can
// simplify some very complex operations.