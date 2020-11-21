///////////////
// Swap Case //
///////////////

// Write a function that takes a string as an argument, and returns
// that string with every lowercase letter changed to uppercase and
// every uppercase letter changed to lowercase. Leave all other
// characters unchanged.

// Examples:
console.log(swapCase('CamelCase'));              // "cAMELcASE"
console.log(swapCase('Tonight on XYZ-TV'));      // "tONIGHT ON xyz-tv"

function swapCase(str) {
  return str.split('').map(element => {
    if (element === element.toLowerCase()) {
      return element.toUpperCase();
    } else {
      return element.toLowerCase();
    }
  }).join('');
}

// Solution
// function swapCase(string) {
//   return string
//     .split("")
//     .map(char => {
//       if ((char >= 'a') && (char <= 'z')) {
//         return char.toUpperCase();
//       } else if ((char >= 'A') && (char <= 'Z')) {
//         return char.toLowerCase();
//       } else {
//         return char;
//       }
//     })
//     .join("");
// }
// Discussion
// The solution uses a transformation strategy for swapping the
// case of the string argument. If the character is a lowercase
// letter, it is changed to uppercase; if the character is an
// uppercase letter, it is changed to lowercase. All other
// characters are left unchanged. Finally, the solution
// joins the characters together into a new string and returns it.