////////////////////
// Triangle Sides //
////////////////////

// A triangle is classified as follows:



// To be a valid triangle, the sum of the lengths of the two shortest sides
// must be greater than the length of the longest side, and every side must
// have a length greater than 0. If either of these conditions is not
// satisfied, the triangle is invalid.

// Write a function that takes the lengths of the three sides of a triangle
// as arguments, and returns one of the following four strings representing
// the triangle's classification: 'equilateral', 'isosceles', 'scalene',
// or 'invalid'.

function triangle(side1, side2, side3) {
  let sides = [side1, side2, side3];
  sides.sort((a, b) => a - b);

  if ( sides.includes(0) || ((sides[0] + sides[1]) > sides[2])) {
    return 'invalid';
  } else {
    switch (sides.filter(side => side === sides[1]).length) {
      case 1: // All three sides are of different lengths.
        return 'scalene';
      case 2: // Two sides are of equal length.
        return 'isosceles';
      default:
        return 'equilateral'; // All three sides are of equal length.
    }
  }
}

// Examples:
console.log(triangle(3, 3, 3));        // "equilateral"
console.log(triangle(3, 3, 1.5));      // "isosceles"
console.log(triangle(3, 4, 5));        // "scalene"
console.log(triangle(0, 3, 3));        // "invalid"
console.log(triangle(3, 1, 1));        // "invalid"