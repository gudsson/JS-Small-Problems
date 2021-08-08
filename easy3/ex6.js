/////////////
// Madlibs //
/////////////

// Madlibs is a simple game where you create a story template with "blanks" for words. 
// You, or another player, then construct a list of words and place them into the story, 
// creating an often silly or funny story as a result.

// Create a simple madlib program that prompts for a noun, a verb, an adverb, and an adjective, 
// and injects them into a story that you create.

// Enter a noun: dog
// Enter a verb: walk
// Enter an adjective: blue
// Enter an adverb: quickly

// // console output
// Do you walk your blue dog quickly? That's hilarious!
// The blue dog walks quickly over the lazy dog.
// The dog quickly walks up blue Joe's turtle.

// initialize
const readline = require('readline-sync');
let responses = {};

// prompts
console.log("Enter a noun:");
responses['noun'] = readline.prompt();

console.log("Enter a verb:");
responses['verb'] = readline.prompt();

console.log("Enter an adjective:");
responses['adjective'] = readline.prompt();

console.log("Enter an adverb:");
responses['adverb'] = readline.prompt();

// Output
let line1 = `Do you ${responses.verb} your ${responses.adjective} ${responses.noun} ${responses.adverb}? That's hilarious!`;
let line2 = `The ${responses.adjective} ${responses.noun} ${responses.verb}s ${responses.adverb} over the lazy ${responses.noun}.`;
let line3 = `The ${responses.noun} ${responses.adverb} ${responses.verb}s up ${responses.adjective} Joe's turtle.`;

console.log(line1);
console.log(line2);
console.log(line3);



