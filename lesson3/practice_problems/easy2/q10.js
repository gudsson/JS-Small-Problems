// Question 10

// Write two one-line expressions to count the number of
// lower-case t characters in each of the following strings:

let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";

console.log(statement1.length - statement1.replace('t','').length);
console.log(statement2.length - statement1.replace('t','').length);

// Solution
// statement1.split('').filter(char => char === 't').length;
// statement2.split('').filter(char => char === 't').length;