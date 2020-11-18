// Question 1

// Let's do some "ASCII Art": a stone-age form of nerd artwork
// from back in the days before computers had video screens.

// For this practice problem, write a program that creates the following output
// 10 times, with each line indented 1 space to the right of the line above it:

// The Flintstones Rock!
//  The Flintstones Rock!
//   The Flintstones Rock!

let outputStr = 'The Flintstones Rock!';
let numOutputs = 10;

for (let idx = 0; idx < numOutputs; idx += 1) {
  console.log(`${(' ').repeat(idx)}${outputStr}`);
}
