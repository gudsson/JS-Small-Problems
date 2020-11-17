const rl = require('readline-sync');
const WINNING_COMBOS = {
  rock:     ['scissors',  'lizard'],
  paper:    ['rock',      'spock'],
  scissors: ['paper',     'lizard'],
  lizard:   ['spock',     'paper'],
  spock:    ['rock',      'scissors'],
};
const VALID_CHOICES = [
  ['r', 'rock'],
  ['p', 'paper'],
  ['sc', 'scissors'],
  ['l', 'lizard'],
  ['sp', 'spock']
];

let choicesArr = [];
VALID_CHOICES.forEach(element => choicesArr.push(`${element[1]} (${element[0]})`));

let scores = {
  'Player Wins': 0,
  'Computer Wins': 0,
  'Ties': 0
};

function prompt(message) {
  console.log(`=>${message}`);
}

function playerWins(playerChoice, computerChoice) {
  return WINNING_COMBOS[playerChoice].includes(computerChoice);
}

function getResult(playerChoice, computerChoice) {
  if (playerWins(playerChoice, computerChoice)) {
    return 'win';
  } else if (playerChoice === computerChoice) {
    return 'tie';
  } else {
    return 'loss';
  }
}

function displayWinner(score) {
  switch (score) {
    case 'win':
      prompt(`You win!`);
      break;
    case 'loss':
      prompt(`Computer wins.`);
      break;
    case 'tie':
      prompt(`It's a tie`);
  }
}

function addScore(score) {
  switch (score) {
    case 'win':
      scores['Player Wins'] += 1;
      break;
    case 'loss':
      scores['Computer Wins'] += 1;
      break;
    case 'tie':
      scores['Ties'] += 1;
  }
}

function displayScores() {
  prompt(`======================`);
  prompt('Current Standings:');
  for (const total in scores) {
    prompt(`     ${scores[total]} | ${total}`);
  }
  prompt(`======================`);
}

function resetScores() {
  scores["Computer Wins"] = 0;
  scores["Player Wins"] = 0;
  scores["ties"] = 0;
}

function checkIfOver() {
  if (scores["Computer Wins"] === 5) {
    prompt('GRAND WINNER: COMPUTER.');
    return true;
  } else if (scores["Player Wins"] === 5) {
    prompt('GRAND WINNER: YOU!');
    return true;
  } else {
    return false;
  }
}

function verifyChoice(choice) {
  return VALID_CHOICES.some(element => element.includes(choice));
}

function lookupChoice(choice) {
  for (let idx = 0; idx < VALID_CHOICES.length; idx++) {
    if (VALID_CHOICES[idx].includes(choice)) {
      return VALID_CHOICES[idx][1];
    }
  }
  return choice;
}

// introduce game
prompt(`+--------------------------------------+`);
prompt(`| ROCK, PAPER, SCISSORS, LIZARD, SPOCK |`);
prompt(`+--------------------------------------+`);

while (true) {

  // get user's choice
  prompt(`Choose one: ${choicesArr.join(', ')}.`);
  let userChoice = rl.question();

  while (!verifyChoice(userChoice)) {
    prompt(`Not a valid input.  Try again:`);
    userChoice = rl.question();
  }

  // get full move name in cases where player used shortcut
  userChoice = lookupChoice(userChoice);

  // choose for computer
  let numOfChoices = Object.keys(VALID_CHOICES).length;
  let cpuChoiceIndex = Math.floor(Math.random() * numOfChoices);
  let cpuChoice = VALID_CHOICES[cpuChoiceIndex][1];

  // display matchup
  prompt(`You chose ${userChoice}, the computer chose ${cpuChoice}.`);

  // determine result
  let result = getResult(userChoice, cpuChoice);
  displayWinner(result);
  addScore(result);
  displayScores();

  // if someone has won 5 games
  if (checkIfOver()) {
    resetScores();

    // offer new game
    prompt(`Play again? (y/n):`);
    let newGame = rl.question().toLowerCase();

    while (newGame[0] !== 'n' && newGame[0] !== 'y') {
      prompt(`Please answer with "y" or "n":`);
      newGame = rl.question().toLowerCase();
    }
    if (newGame[0] !== 'y') break;
  }
}