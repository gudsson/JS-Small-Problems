const readline = require('readline-sync');

console.log('What is the bill?');
let bill = parseFloat(readline.prompt());

console.log('What is the tip percentage?');
let tipPc = parseFloat(readline.prompt()) / 100;

let tip = bill * tipPc

console.log(`The tip is $${tip.toFixed(2)}`);
console.log(`The total is $${(bill + tip).toFixed(2)}`);