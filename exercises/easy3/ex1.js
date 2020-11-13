/////////////////////////////
// ddaaiillyy ddoouubbllee //
/////////////////////////////

// Write a function that takes a string argument and returns a new string that contains the value 
// of the original string with all consecutive duplicate characters collapsed into a single character.

console.log(crunch('ddaaiillyy ddoouubbllee'));    // "daily double"
console.log(crunch('4444abcabccba'));              // "4abcabcba"
console.log(crunch('ggggggggggggggg'));            // "g"
console.log(crunch('a'));                          // "a"
console.log(crunch(''));                           // ""


function crunch(input) {
  let newStr = '';
  for(let i = 0; i < input.length; i++) {
    if(input[i] !== input[i + 1]) {
      newStr += input[i];
    }
  }
  return newStr;
}