// Question 3

// Given the following similar sets of code, what will each code snippet print?
function messWithVars(one, two, three) {
  one.splice(0, 1, "two");
  two.splice(0, 1, "three");
  three.splice(0, 1, "one");
}

let one = ["one"];
let two = ["two"];
let three = ["three"];

messWithVars(one, two, three);

console.log(`one is: ${one}`); // => 'two'
console.log(`two is: ${two}`); // => 'three'
console.log(`three is: ${three}`); // => 'one'