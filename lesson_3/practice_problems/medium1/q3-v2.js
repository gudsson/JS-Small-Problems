// function factors(number) {
//   let divisor = number;
//   let factors = [];
//   do {
//     if (number % divisor === 0) {
//       factors.push(number / divisor);
//     }
//     divisor -= 1;
//   } while (divisor !== 0);
//   return factors;
// }

function factors(number) {
  let divisor = number;
  let factors = [];

  if (number < 1) return 'Invalid input.';

  while (divisor !== 0) {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  }
  return factors;
}

console.log(factors(-1));
console.log(factors(0));
console.log(factors(3));