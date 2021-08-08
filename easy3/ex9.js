////////////////////////
// Clean up the words //
////////////////////////

// Given a string that consists of some words and an assortment of non-alphabetic characters, write a function 
// that returns that string with all of the non-alphabetic characters replaced by spaces. If one or more 
// non-alphabetic characters occur in a row, you should only have one space in the result (i.e., the result 
// string should never have consecutive spaces).

cleanUp("---what's my +*& line?");    // " what s my line "

function cleanUp(input) {
  let alpha = 'abcdefghijklmnopqrstuvwxyz';
  let newStr = '';

  for(let i = 0; i < input.length; i++) {
    if (alpha.indexOf(input[i]) < 0) {
      newStr += ' ';
    } else {
      newStr += input[i];
    }
  }
  return console.log(newStr.replace(/\s+/g,' ').trim());
}