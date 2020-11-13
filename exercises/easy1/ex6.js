const readline = require('readline-sync');

console.log('Please enter an integer greater than 0:');
let number = parseInt(readline.prompt(), 10);

let res = getSumOrProduct();

console.log(`The ${res.operation} of the integers between 1 and ${number} is ${res.result}.`);

function getSumOrProduct() {
  while (true) {
    console.log('Enter "s" to compute the sum, or "p" to compute the product.');
    let operation = readline.prompt();
    if (operation === 's') {
      let sum = 0;
      for (let i = 1; i <= number; i++) {
        sum = sum + i;
      }
      return {
        'operation': 'sum',
        'result': sum
      };
    } else if (operation === 'p') {
      let product = 1;
      for (let i = 2; i <= number; i++) {
        product = product * i;
      }
      return {
        'operation': 'product',
        'result': product
      };
    }
  }
}