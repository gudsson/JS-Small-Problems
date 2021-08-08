///////////////////////////
// What Century is That? //
///////////////////////////

// Write a function that takes a year as input and returns the century. The return value should be a string 
// that begins with the century number, and ends with 'st', 'nd', 'rd', or 'th' as appropriate for that number.

// New centuries begin in years that end with 01. So, the years 1901 - 2000 comprise the 20th century.

century(2000);        // "20th"
century(2001);        // "21st"
century(1965);        // "20th"
century(256);         // "3rd"
century(5);           // "1st"
century(10103);       // "102nd"
century(1052);        // "11th"
century(1127);        // "12th"
century(11201);       // "113th"

function century(year) {
  let century = Math.floor(year / 100) + ((year % 100) ? 1 : 0);
  let lastTwoDigits = century.toString().slice(-2);
  if (lastTwoDigits === '11' || lastTwoDigits === '12' || lastTwoDigits === '13') {
    century += 'th';
  } else {
    switch (century.toString().slice(-1)) {
      case '1':
      century += 'st';
      break;
    case '2':
      century += 'nd';
      break;
    case '3':
      century += 'rd';
      break;
    default:
      century += 'th';
    }
  }
  return console.log(century);
}