//////////////////
// Seeing Stars //
//////////////////

// Write a function that displays an 8-pointed star in an NxN
// grid, where N is an odd integer that is supplied as an argument
// to the function. The smallest such star you need to handle is
// a 7x7 grid (i.e., when N is 7).

function star(n) {
  let middle = Math.floor(n / 2)
  for (let row = 0; row < n; row++) {
    if (row === middle) {
      console.log('*'.repeat(n));
    } else console.log(row + 1);
  }

  return null;
}

// Examples:
star(7);
// logs
// *  *  *
//  * * *
//   ***
// *******
//   ***
//  * * *
// *  *  *

// star(9);
// logs
// *   *   *
//  *  *  *
//   * * *
//    ***
// *********
//    ***
//   * * *
//  *  *  *
// *   *   *