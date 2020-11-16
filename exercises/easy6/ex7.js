///////////////////
// Name Swapping //
///////////////////

// Write a function that takes a string argument consisting of a first name, a space, and a last name, 
// and returns a new string consisting of the last name, a comma, a space, and the first name.

// Examples:
swapName('Joe Roberts');    // "Roberts, Joe"

function swapName(name) {
  let nameArr = name.split(' ');
  return console.log(`${nameArr[1]}, ${nameArr[0]}`);
}

// Solution
// Copy Code
// function swapName(name) {
//   return name.split(' ').reverse().join(', ');
// }
// Discussion
// Given a full name as a string and a space as a separator, the solution uses the String.prototype.split method to get an array of words (e.g., ['Joe', 'Roberts']). The solution then uses Array.prototype.reverse to get ['Roberts', 'Joe'], and finally, uses Array.prototype.join, with a separator string containing a comma and a space (', '), to return the desired result.

// Further Exploration
// What if the person has one or more middle names? Refactor the current solution so that it can accommodate this; the middle names should be listed after the first name:

// swapName('Karl Oskar Henriksson Ragvals');    // "Ragvals, Karl Oskar Henriksson"