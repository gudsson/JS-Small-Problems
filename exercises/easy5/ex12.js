/////////////////////////////
// After Midnight (Part 2) //
/////////////////////////////

// As seen in the previous exercise, the time of day can be represented as the 
// number of minutes before or after midnight. If the number of minutes is positive, 
// the time is after midnight. If the number of minutes is negative, the time is 
// before midnight.

// Write two functions that each take a time of day in 24 hour format, and return 
// the number of minutes before and after midnight, respectively. Both functions 
// should return a value in the range 0..1439.

// You may not use javascript's Date class methods.

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;
const MINUTES_IN_DAY = HOURS_IN_DAY * MINUTES_IN_HOUR;

// Examples:
console.log(afterMidnight("00:00") === 0);
console.log(beforeMidnight("00:00") === 0);
console.log(afterMidnight("12:34") === 754);
console.log(beforeMidnight("12:34") === 686);
console.log(afterMidnight("24:00") === 0);
console.log(beforeMidnight("24:00") === 0);

function afterMidnight(time) {
  let timeArr = time.split(":")
  let hours = timeArr[0];
  let minutes = timeArr[1];

  if (hours === '24') {hours = '0'}

  let minutesDelta = parseInt(hours) * MINUTES_IN_HOUR + parseInt(minutes);

  return minutesDelta;
}

function beforeMidnight(time) {
  let afterMinutes = afterMidnight(time);
  let result = MINUTES_IN_DAY - afterMinutes;

  // if (result === MINUTES_IN_DAY) {result = 0}
  result = ((result === MINUTES_IN_DAY) ? 0 : result);

  return result;
}