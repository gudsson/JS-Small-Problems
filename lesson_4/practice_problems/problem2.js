////////////////////////
// Practice Problem 2 //
////////////////////////

// What is the return value of map in the following code? Why?

[1, 2, 3].map(num => {
  num * num;
});

// -> [undefined, undefined, undefined] because map returns undefined when no return statement is provided.