let rl = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(num) {
  return num.trimStart() === '' || Number.isNaN(Number(num));
}

// Title
prompt(`Welcome to the Loan Calculator!`);


// Inputs //

// loan
prompt(`What's the loan amount (in dollars)?:`);

let loan = rl.question('$').replace(',', '');

while (loan < 0 || invalidNumber(loan)) {
  prompt('Loan amount must be a positive number (in dollars).  Try again:');
  loan = rl.question('$').replace(',', '');
}

// apr
prompt(`What's the Annual Percentage Rate (APR) as a percentage?:`);

let apr = rl.question().replace('%', '');

while (apr < 0 || apr > 100 || invalidNumber(apr)) {
  prompt('APR must be between 0% and 100%.  Try again:');
  apr = rl.question().replace('%', '');
}

// duration
prompt(`What's the loan duration (in years)?:`);

let years = +rl.question();

while (!Number.isInteger(years)) {
  prompt('Loan duration must be integer value (in years).  Try again:');
  years = rl.question();
}

// Intermediate Calcs
let monthlyRate = (apr / 12) / 100;
let months = (years * 12);


//loan payment
let payment;

if (apr) {
  payment = loan * (monthlyRate / (1 - ((1 + monthlyRate) ** (-months))));
} else {
  payment = loan / months;
}

let result = payment.toLocaleString("en", {maximumFractionDigits:2});

prompt(`The monthly loan payment is $${result}`);

// // Solution
// const readline = require('readline-sync');

// function prompt(message) {
//   console.log(`=> ${message}`);
// }

// function isInvalidNumber(number) {
//   return number.trim() === '' ||
//          Number(number) < 0   ||
//          Number.isNaN(Number(number));
// }

// prompt('Welcome to Mortgage Calculator!');

// while (true) {
//   prompt('---------------------------------');

//   prompt('What is the loan amount?');

//   let amount = readline.question();
//   while (isInvalidNumber(amount)) {
//     prompt('Must enter a positive number');
//     amount = readline.question();
//   }

//   prompt("What is the interest rate?");
//   prompt("(Example: 5 for 5% or 2.5 for 2.5%)");
//   let interestRate = readline.question();

//   while (isInvalidNumber(interestRate)) {
//     prompt('Must enter a positive number');
//     interestRate = readline.question();
//   }

//   prompt("What is the loan duration (in years)?");
//   let years = readline.question();

//   while (isInvalidNumber(years)) {
//     prompt('Must enter a positive number');
//     years = readline.question();
//   }

//   let annualInterestRate = Number(interestRate) / 100;
//   let monthlyInterestRate = annualInterestRate / 12;
//   let months = Number(years) * 12;

//   let monthlyPayment = Number(amount) *
//                   (monthlyInterestRate /
//                   (1 - Math.pow((1 + monthlyInterestRate), (-Number(months)))));

//   prompt(`Your monthly payment is: $${monthlyPayment.toFixed(2)}`);

//   prompt("Another calculation?");
//   let answer = readline.question().toLowerCase();
//   while (answer[0] !== 'n' && answer[0] !== 'y') {
//     prompt('Please enter "y" or "n".');
//     answer = readline.question().toLowerCase();
//   }

//   if (answer[0] === 'n') break;
// }