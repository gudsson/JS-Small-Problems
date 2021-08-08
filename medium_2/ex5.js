////////////////////////////////////////////////////
// Next Featured Number Higher than a Given Value //
////////////////////////////////////////////////////

// A featured number (something unique to this exercise) is an odd number that
// is a multiple of 7, with all of its digits occuring exactly once each. For
// example, 49 is a featured number, but 98 is not (it is not odd), 97 is not
// (it is not a multiple of 7), and 133 is not (the digit 3 appears twice).

// Write a function that takes an integer as an argument, and returns the next
// featured number greater than the integer. Issue an error message if there is
// no next featured number.

// NOTE: The largest possible featured number is 9876543201.

function featured(num) {

  if (num === 9876543201) {
    return "There is no possible number that fulfills those requirements.";
  }

  let currentNum = Math.ceil(num / 7) * 7;

  while (currentNum < 987654321) {
    if (oddNumber(currentNum) && uniqueDigits(currentNum)) {
      break;
    } else {
      currentNum += 7;
    }
  }
  return currentNum;
}

function oddNumber(num) {
  return Boolean(num % 2);
}

function uniqueDigits(num) {
  let numArr = num.toString().split('');
  return ([...new Set(numArr)].length === numArr.length);
}

// Examples:
console.log(featured(12));           // 21
console.log(featured(20));           // 21
console.log(featured(21));           // 35
console.log(featured(997));          // 1029
console.log(featured(1029));         // 1043
console.log(featured(999999));       // 1023547
console.log(featured(999999987));    // 1023456987
console.log(featured(9876543200));   // 9876543201
console.log(featured(9876543201));   // "There is no possible number that fulfills those requirements."