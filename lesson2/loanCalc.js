let rl = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

prompt(`Welcome to the Loan Calculator!`);

prompt(`What's the monthly loan payment?:`);
let monthlyPayment = rl.question();

prompt(`What's the monthly loan payment?:`);
let monthlyPayment = rl.question();

prompt(`What's the loan amount?:`);
let loanAmount = rl.question();