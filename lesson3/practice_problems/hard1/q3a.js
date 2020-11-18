// Question 3

// Given the following similar sets of code, what will each code snippet print?
function messWithVars(one, two, three) {
  one = two;
  two = three;
  three = one;
}

let one = ["one"];
let two = ["two"];
let three = ["three"];

messWithVars(one, two, three);

console.log(`one is: ${one}`); // => 'one'
console.log(`two is: ${two}`); // => 'two'
console.log(`three is: ${three}`); // => 'three'

