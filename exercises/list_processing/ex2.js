//////////////////////////
// Alphabetical Numbers //
//////////////////////////

// Write a function that takes an array of integers between 0 and 19, and
// returns an array of those integers sorted based on the English word for
// each number:

// zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven,
// twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen

const ALPHA_NAMES = {
  0:'zero',
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen'
};

function alphabeticNumberSort(intArray) {
  // first, return new array of integer names by looking up intArray values
  // against ALPHA_NAMES
  let nameArray = intArray.map(element => ALPHA_NAMES[parseInt(element, 10)]);

  // sort array and return
  return nameArray.sort();
}

let intArray =
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

console.log(alphabeticNumberSort(intArray));

