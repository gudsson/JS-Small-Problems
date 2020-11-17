const VALID_CHOICES = {
  0: ['r', 'rock'],
  1: ['p', 'paper'],
  2: ['sc', 'scissors'],
  3: ['l', 'lizard'],
  4: ['sp', 'spock']
};

// let choicesArr = [];
// for (const shortcut in VALID_CHOICES) {
//   choicesArr.push(`${VALID_CHOICES[shortcut]} (${shortcut})`);
// }
// console.log(`Choose one: ${choicesArr.join(', ')}.`);

let choice = 'sp';
let validation = false;

for (const option in VALID_CHOICES) {
  console.log(VALID_CHOICES[option]);
  if (VALID_CHOICES[option].includes(choice)) {
    validation = true;
  }
}

console.log(validation);

// let choiceArr = Object.values(VALID_CHOICES);

// // let test = choiceArr.forEach( element => {
// //   if (element.includes(choice)) {
// //     return true;
// //   } else {
// //     return false;
// //   }
// // });

// console.log(test);



// if (Object.values(VALID_CHOICES).includes(choice)) {
//   console.log(true);
// }