/////////////////////////
// Practice Problem 11 //
/////////////////////////

// Create an object that expresses the frequency with which
// each letter occurs in this string:

let statement = "The Flintstones Rock";

// The output will look something like the following:

// { T: 1, h: 1, e: 2, F: 1, l: 1, ... }

let countObj = {};

statement.split('').forEach(element => {
  if (element.match(/[a-z]/gi)) {
    if (countObj[element]) {
      countObj[element] += 1;
    } else countObj[element] = 1;
  }
});

console.log(countObj);