// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for an operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal.

const readline = require('readline-sync');

console.log('Welcome to Calculator!');

console.log("What's the first number?");
let number1 = readline.question();

console.log("What's the second number?");
let number2 = readline.question();

console.log('What operation would you like to perform?\n1) Add 2) Subtract 3) Multiply 4) Divide');
let operation = readline.question();

// console.log(`${number1} ${number2}`);

let output;
if (operation === '1') { // '1' is addition
  output = Number(number1) + Number(number2);
} else if (operation === '2') { // '2' is subtraction
  output = Number(number1) - Number(number2);
} else if (operation === '3') { // '3' is multiplication
  output = Number(number1) * Number(number2);
} else if (operation === '4') { // '4' is division      
  output = Number(number1) / Number(number2);
}

console.log(`The result is: ${output}`);