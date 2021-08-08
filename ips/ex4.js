//////////////////
// Seeing Stars //
//////////////////

// Write a function that displays an 8-pointed star in an NxN
// grid, where N is an odd integer that is supplied as an argument
// to the function. The smallest such star you need to handle is
// a 7x7 grid (i.e., when N is 7).

function star(n) {
  let middle = Math.floor(n / 2);
  let padding = n - 3;
  for (let row = 0; row < n; row++) {
    if (row === middle) {
      console.log('*'.repeat(n));
    } else {
      let toMiddle = (row > middle) ? row - middle - 1 : middle - row - 1;
      let sidePad = (padding / 2) - toMiddle;
      let middlePad = (padding - (2 * sidePad)) / 2;
      console.log(
        ' '.repeat(sidePad)
          + '*' + ' '.repeat(middlePad)
          + '*' + ' '.repeat(middlePad)
          + '*' + ' '.repeat(sidePad)
      );
    }
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

star(9);
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