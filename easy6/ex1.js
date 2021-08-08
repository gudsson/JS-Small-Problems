//////////////////////////
// Double Char (Part 1) //
//////////////////////////

// Write a function that takes a string, doubles every character in the 
// string, and returns the result as a new string.

// Examples:
repeater('Hello');        // "HHeelllloo"
repeater('Good job!');    // "GGoooodd  jjoobb!!"
repeater('');             // ""

function repeater(str) {
  let newStr = '';
  let strArr = str.split('');

  for (let i = 0; i < str.length; i++) {
    newStr += strArr[i].toString().repeat(2);
  }

  return console.log(newStr);
}