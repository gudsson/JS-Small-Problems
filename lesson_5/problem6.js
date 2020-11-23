////////////////////////
// Practice Problem 6 //
////////////////////////

// One of the most frequently used real-world string operations is that
// of "string substitution," where we take a hard-coded string and modify
// it with various parameters from our program.

// Given this previously seen family object, print the name, age, and
// gender of each family member:

let munsters = {
  herman: { age: 32, gender: 'male' },
  lily: { age: 30, gender: 'female' },
  grandpa: { age: 402, gender: 'male' },
  eddie: { age: 10, gender: 'male' },
  marilyn: { age: 23, gender: 'female'}
};

// Each output line should follow this pattern:

// (Name) is a (age)-year-old (male or female).

Object.keys(munsters).forEach(person => {
  console.log(`${person} is a ${person.age}-year-old ${person.gender}.`);
});

// Solution

// Object.entries(munsters).forEach(entry => {
//   let name = entry[0];
//   let age = entry[1]['age'];
//   let gender = entry[1].gender;

//   console.log(`${name} is a ${age}-year-old ${gender}.`);
// });

// Here, we need to access both the key (each family member's name) and the
// value (the inner objects containing the details), so we need to use
// Object.entries, which gives us each key-value pair as the first and
// second elements of a sub-array.