/////////////////////////////
// Staggered Caps (Part 1) //
/////////////////////////////

// Write a function that takes a string as an argument, and returns that
// string with a staggered capitalization scheme. Every other character,
// starting from the first, should be capitalized and should be followed
// by a lowercase or non-alphabetic character. Non-alphabetic characters
// should not be changed, but should be counted as characters for
// determining when to switch between upper and lower case.

console.log(staggeredCase('I Love Launch School!'));        // "I LoVe lAuNcH ScHoOl!"
console.log(staggeredCase('ALL_CAPS'));                     // "AlL_CaPs"
console.log(staggeredCase('ignore 77 the 4444 numbers'));   // "IgNoRe 77 ThE 4444 nUmBeRs"

function staggeredCase(str) {
  return str.split('').map((element, idx) => {
    if (element.match(/[a-z]/gi)) {
      if (idx % 2) {
        return element.toLowerCase();
      } else {
        return element.toUpperCase();
      }
    } else {
      return element;
    }
  }).join('');
}

// Solution
// function staggeredCase(string) {
//   return string
//     .split("")
//     .map((char, index) => {
//       if (index % 2 === 0) {
//         return char.toUpperCase();
//       } else {
//         return char.toLowerCase();
//       }
//     })
//     .join("");
// }
// Discussion
// The solution uses a transformation processing strategy to convert each
// character in the string argument to the appropriate case. The
// String.prototype.toUpperCase and String.prototype.toLowerCase
// methods handle both alphabetic and non-alphabetic characters.
// To determine the appropriate case, the solution uses the index 
// alue provided by the Array.prototype.map method. When the index
// is an even number, the solution changes the character to uppercase;
// lowercase otherwise. After the transformation, the solution joins the
// characters back together using the Array.prototype.join method, and
// returns the resulting string.