// Multiples of 3 and 5
//
// Write a function that computes the sum of all numbers between 1 and some 
// other number, inclusive, that are multiples of 3 or 5. For instance, if the 
// supplied number is 20, the result should be 98 (3 + 5 + 6 + 9 + 10 + 12 + 15 + 18 + 20).
//
// You may assume that the number passed in is an integer greater than 1.

console.log(multisum(3));       // 3
console.log(multisum(5));       // 8
console.log(multisum(10));      // 33
console.log(multisum(1000));    // 234168

function multisum(number) {
  let sum = 0;
  for(let i = 1; i <= number; i++){
    if (!(i % 3)  || !(i % 5)) {
      sum += i;
    }
  }
  return sum;
}