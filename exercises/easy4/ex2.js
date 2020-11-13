///////////////////
// Searching 101 //
///////////////////

// Write a program that solicits six numbers from the user, then logs a message that describes 
// whether or not the sixth number appears amongst the first five numbers.

// Examples:
// Enter the 1st number: 25
// Enter the 2nd number: 15
// Enter the 3rd number: 20
// Enter the 4th number: 17
// Enter the 5th number: 23
// Enter the last number: 17

// The number 17 appears in 25,15,20,17,23.

// -----

// Enter the 1st number: 25
// Enter the 2nd number: 15
// Enter the 3rd number: 20
// Enter the 4th number: 17
// Enter the 5th number: 23
// Enter the last number: 18

// The number 18 does not appear in 25,15,20,17,23.

const rl = require('readline-sync');
let promptArr = ['1st', '2nd', '3rd', '4th', '5th', 'last'];
let numArr = [];

promptArr.forEach(element => queryUser(element));
checkSixth(numArr);

function queryUser(index) {
  console.log(`Enter the ${index} number:`);
  numArr.push(rl.prompt());
}

function checkSixth(arr) {
  let toFind = arr[5];
  let searchArr = arr.slice(0,-1);
  if (searchArr.includes(toFind)) {
    return console.log(`\nThe number ${toFind} appears in ${searchArr.join(",")}.`);
  } else {    
    return console.log(`\nThe number ${toFind} does not appear in ${searchArr.join(",")}.`);
  }
}

