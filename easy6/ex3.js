////////////////////
// Reverse Number //
////////////////////

// Write a function that takes a positive integer as an argument, and returns that number with its digits reversed.

// Examples:
reverseNumber(12345);    // 54321
reverseNumber(12213);    // 31221
reverseNumber(456);      // 654
reverseNumber(12000);    // 21 -- Note that leading zeros in the result get dropped!
reverseNumber(1);        // 1

function reverseNumber(num) {
  return console.log(Number(num.toString().split('').reverse().join('')));
}

// Solution
// function reverseNumber(number) {
//   let numberStringArray = String(number).split('');
//   let reversedStringedNum = numberStringArray.reverse().join('');
//   return parseInt(reversedStringedNum, 10);
// }
// Discussion
// Our solution leverages the Array.prototype.reverse method. It converts the number argument to a string and splits out the digits by using an empty string ('') as the separator. It then reverses the array, joins it together with an empty string ('') as a separator, passes the resulting string to parseInt to convert it to a number, and returns the result.

// Notice the radix of 10 as a second argument to parseInt. This gives the parseInt function the base by which it parses the number. If the number string contains leading zeroes (e.g., '00021'), parseInt may convert the number to 17 (base 8) instead of 21 (base 10); the behavior varies based on the version of JavaScript.