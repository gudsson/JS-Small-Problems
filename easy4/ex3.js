/////////////////////////
// When Will I Retire? //
/////////////////////////

// Build a program that logs when the user will retire and how many more years the user has to work until retirement.

// Example:
// What is your age? 30
// At what age would you like to retire? 70

// It's 2017. You will retire in 2057.
// You have only 40 years of work to go!

const rl = require('readline-sync');
const currentYear = new Date().getFullYear();
let responses = [];

console.log(`What is your age?`);
responses.currentAge = rl.question();

console.log(`At what age would you like to retire?`);
responses.retireAge = rl.question();

retireWhen(responses);

function retireWhen(inputs) {
  let yearsToGo = inputs.retireAge - inputs.currentAge;
  console.log(`It's ${currentYear}.  You will retire in ${currentYear + yearsToGo}`);
  console.log(`You have only ${yearsToGo} years of work to go!`);
}