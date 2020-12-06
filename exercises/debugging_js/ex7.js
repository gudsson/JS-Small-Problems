////////////
// Glory! //
////////////

// We want to implement a role-playing game and started working
// on the dice roll functionality. First, study the game code.
// Then take a look at the example output and information provided
// below.

// Standard role-playing dice, with 20 faces,
// specified in terms of minimum and maximum face value.

let d20 = {min: 1, max: 20};

function roll(die) {
  return Math.floor(Math.random() * (die.max - die.min + 1)) + die.min;
}

// Standard target roll tossing a 20-sided die,
// with optional bonus and penalty dice.
// Used to determine whether a character wanting to perform an action
// succeeds or fails, based on whether the sum of the dice is higher
// or lower than the relevant character trait.
// (See below for examples.)
function targetRoll(characterValue) {

  let result = roll(d20);

  console.log("--> " + result);

  switch (result) {
    case 1:
      automaticFail();
      break;
    case 20:
      automaticSuccess();
      break;
    default:
      void (result >= characterValue ? success() : fail());
  }
}

function success() {
  console.log("Your character succeeds.");
}

function fail () {
  console.log("Your character fails.");
}

function automaticSuccess() {
  console.log("Your character succeeds without effort. Glory!");
}

function automaticFail() {
  console.log("Meagre attempt. Your character fails miserably.");
}

// Example character.
let myCharacter = {
  name: 'Jenkins',
  strength: 4,
  constitution: 6,
  education: 11,
  luck: 3,
  sanity: 9,
};

// Example rolls:

// Jenkins wants to break in a door with brute force,
// so he has to roll against his strength value.
targetRoll(myCharacter.strength);

// Jenkins found an ancient scroll and attempts to decipher it.
// He has to roll against his education, in order to determine
// whether he's able to read it.
targetRoll(myCharacter.education);
// When playing around with the above program, our two test
// rolls result in two random values that produce the sample
// output below (because each dice roll produces a random value,
// your output may differ). The outcome of rolling 16 looks
// correct, but the output when we rolled values 1 and 20
// doesn't make sense. For each roll, only one outcome should
// be displayed. What is wrong with the code?

// --> 1
// Meagre attempt. Your character fails miserably.
// Your character succeeds without effort. Glory!
// Your character fails.
// --> 20
// Your character succeeds without effort. Glory!
// Your character succeeds.
// --> 16
// Your character succeeds.