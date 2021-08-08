/////////////////////////
// Palindromic Numbers //
/////////////////////////

// Write a function that returns true if its integer argument is palindromic, or false otherwise. 
// A palindromic number reads the same forwards and backwards.

// Examples:
isPalindromicNumber(34543);        // true
isPalindromicNumber(123210);       // false
isPalindromicNumber(22);           // true
isPalindromicNumber(5);            // true

function isPalindromicNumber(num) {
  return console.log(num === Number(num.toString().split('').reverse().join('')));
}