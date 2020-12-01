/////////////////////////////////
// Lettercase Percentage Ratio //
/////////////////////////////////

// Write a function that takes a string, and returns an object
// containing the following three properties:

// the percentage of characters in the string that are lowercase letters
// the percentage of characters that are uppercase letters
// the percentage of characters that are neither
// You may assume that the string will always contain at least one character.

function letterPercentages(str) {
  let lcLen = (str + 'a').match(/[a-z]/g).length - 1;
  let ucLen = (str + 'A').match(/[A-Z]/g).length - 1;
  let oLen = str.length - lcLen - ucLen;

  return {
    lowercase: ((lcLen / str.length) * 100).toFixed(2),
    uppercase: ((ucLen / str.length) * 100).toFixed(2),
    neither: ((oLen / str.length) * 100).toFixed(2),
  };
}

// Examples:
console.log(letterPercentages('abCdef 123'));
// { lowercase: "50.00", uppercase: "10.00", neither: "40.00" }

console.log(letterPercentages('AbCd +Ef'));
// { lowercase: "37.50", uppercase: "37.50", neither: "25.00" }

console.log(letterPercentages('123'));
// { lowercase: "0.00", uppercase: "0.00", neither: "100.00" }