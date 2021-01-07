// Write three different ways to remove all of the
// elements from the following array:

let numbers = [1, 2, 3, 4];

// Method 1
// numbers = [];

// Method 2
// numbers.slice().forEach(_ => numbers.shift());

// Method 3
numbers.length = 0;
console.log(numbers);
