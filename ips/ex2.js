//////////////
// Diamonds //
//////////////

// Write a function that displays a four-pointed diamond in an
// nxn grid, where n is an odd integer supplied as an argument to
// the function. You may assume that the argument will always be
// an odd integer.

function diamond(n) {
  for (let row = 0; row < n; row++) {
    let padding = Math.abs(n - ((2 * row) + 1));
    console.log(
      ' '.repeat(padding / 2) + '*'.repeat(n - padding)
        + ' '.repeat(padding / 2)
    );
  }
  return null;
}

// Examples:
diamond(1);
// logs
// *

diamond(3);
// logs
//  *
// ***
//  *

diamond(9);
// logs
//     *
//    ***
//   *****
//  *******
// *********
//  *******
//   *****
//    ***
//     *