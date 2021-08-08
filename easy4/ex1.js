///////////////////////
// How old is Teddy? //
///////////////////////

// Build a program that randomly generates Teddy's age, and logs it to the console. Have the age be a 
// random number between 20 and 120 (inclusive).

// Sample output:
// > Teddy is 69 years old!

let age = (Math.random() * 100 + 20).toFixed(0);

console.log(`Teddy is ${age} years old!`);