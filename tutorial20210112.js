/* eslint-disable max-len */
// Algorithm

// - declare new array variable and initialize it with sum of digits in existing array through a loop
// - at each loop iteration (map):
//    - at each loop iteration, split each string element into component characters
//    - convert each component character into a number
//    - sum converted digits (reduce)
// !!! now we should have a variable containing array of summed digits
// - loop through new array variable and check if each element, divided by 3, produces a remainder
//   - filter out values that don't meet condition
// - if length of filtered array is greater than or equal to 3, return true, else false

// declare and initialize new array containing each word
// iterate over array
// - for each element, convert to lowercase and iterate over each letter
//   checking if letter appears in string 'aeiou'.  Filter out values that don't appear in 'aeiou'
// - iterate again over filtered array, and return length of each filtered string into new array
// - return new array

function vowelCount(str) {
  let words = str.toLowerCase().split(' ');
  let nVowels = words.map(word => {
    return word.split('').filter(char => {
      return 'aeiou'.includes(char);
    }).join('');
  }).map(vowels => vowels.length);
  return nVowels;
}

console.log(vowelCount('WhaTs yOur enneagram?'));
// [1, 2, 4]
console.log(vowelCount('Colonel Sanders feeds me well !!'));
// [3, 2, 2, 1, 1, 0]
console.log(vowelCount(''));
// []
console.log(vowelCount('ZoInkies!! There are monsters in here.'));
// [4, 2, 2, 2, 1, 2]
console.log(vowelCount('grrr!'));
// [0]