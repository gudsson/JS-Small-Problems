//////////////////////////
// Double Char (Part 2) //
//////////////////////////

// Write a function that takes a string, doubles every consonant character 
// in the string, and returns the result as a new string. The function should
// not double vowels ('a','e','i','o','u'), digits, punctuation, or whitespace.

const VOWELS = ['a','e','i','o','u'];

// Examples:
doubleConsonants('String');          // "SSttrrinngg"
doubleConsonants('Hello-World!');    // "HHellllo-WWorrlldd!"
doubleConsonants('July 4th');        // "JJullyy 4tthh"
doubleConsonants('');                // ""

function doubleConsonants(str) {
  return console.log(str.split("").map(e => {
    if (e.toLowerCase() >= 'a' && e.toLowerCase() <= 'z' && !VOWELS.includes(e)) {
      return e + e;
    } else {
      return e;
    }
  }).join(""));
}

// Given solution:

// function doubleConsonants(string) {
//   const CONSONANTS = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
//                   'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
//   let stringArray = [];

//   for (let idx = 0; idx < string.length; idx += 1) {
//     stringArray.push(string[idx]);
//     if (CONSONANTS.indexOf(string[idx].toLowerCase()) >= 0) {
//       stringArray.push(string[idx]);
//     }
//   }

//   return stringArray.join("");
// }