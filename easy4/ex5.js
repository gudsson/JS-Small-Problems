//////////////////////////////////
// Palindromic Strings (Part 2) //
//////////////////////////////////

// Write another function that returns true if the string passed as an argument is a palindrome, 
// or false otherwise. This time, however, your function should be case-insensitive, and should 
// ignore all non-alphanumeric characters. If you wish, you may simplify things by calling the 
// isPalindrome function you wrote in the previous exercise.

// Examples:
isRealPalindrome('madam');               // true
isRealPalindrome('Madam');               // true (case does not matter)
isRealPalindrome("Madam, I'm Adam");     // true (only alphanumerics matter)
isRealPalindrome('356653');              // true
isRealPalindrome('356a653');             // true
isRealPalindrome('123ab321');            // false

function isRealPalindrome(str) {
  isPalindrome(str.toLowerCase().replace(/[^0-9a-z]/g, ''));
}

function isPalindrome(str) {
  let reversedStr = str.split('').reverse().join('');
  return console.log(str === reversedStr);
}