// Question 9

// In the previous problem, our first answer added 'Dino'
// to the array like this:
let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
// flintstones.push("Dino");

// How can we add multiple items to our array? ('Dino' and 'Hoppy')
flintstones = flintstones.concat(flintstones, ['Dino', 'Hoppy']);

console.log(flintstones);

// Solution
// let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
// flintstones.push("Dino", "Hoppy");   // we can pass multiple arguments to push