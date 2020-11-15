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
  // str.split('').map(e => e + e).join('');
  console.log(str.split('').map(e => e + e).join(''));
}

function isLowerCaseLetter(char) {
  return char >= 'a' && char <= 'z';
}

function isUpperCaseLetter(char) {
  return char >= 'A' && char <= 'Z';
}