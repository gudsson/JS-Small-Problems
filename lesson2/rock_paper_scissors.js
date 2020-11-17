const rl = require('readline-sync');
const VALID_CHOICES = ['rock', 'paper', 'scissors'];

function prompt(message) {
  console.log(`=>${message}`);
}

function displayWinner(userChoice, computerChoice) {
  if ((userChoice === 'rock' && computerChoice === 'scissors') ||
  (userChoice === 'paper' && computerChoice === 'rock') ||
  (userChoice === 'scissors' && computerChoice === 'paper')) {
    prompt(`You win!`);
  } else if ((computerChoice === 'rock' && userChoice === 'scissors') ||
  (computerChoice === 'paper' && userChoice === 'rock') ||
  (computerChoice === 'scissors' && userChoice === 'paper')) {
    prompt(`Computer wins!`);
  } else {
    prompt(`It's a tie.`);
  }
}

while (true) {

  // get user's choice
  prompt(`Choose one: ${VALID_CHOICES.join(', ')}:`);
  let userChoice = rl.question();

  while (!VALID_CHOICES.includes(userChoice.toLowerCase())) {
    prompt(`Not a valid input.  Try again:`);
    userChoice = rl.question();
  }

  // choose for computer
  let cpuChoiceIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let cpuChoice = VALID_CHOICES[cpuChoiceIndex];

  // display matchup
  prompt(`You chose ${userChoice}, the computer chose ${cpuChoice}.`);

  // determine result
  displayWinner(userChoice, cpuChoice);

  // offer new game
  prompt(`Play again? (y/n):`);
  let newGame = rl.question().toLowerCase();
  while (newGame[0] !== 'n' && newGame[0] !== 'y') {
    prompt(`Please answer with "y" or "n":`);
    newGame = rl.question().toLowerCase();
  }

  if (newGame[0] !== 'y') break;
}