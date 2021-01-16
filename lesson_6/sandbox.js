const readline = require('readline-sync');

const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
  [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
  [1, 5, 9], [3, 5, 7]             // diagonals
];
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const COMPUTER_MARKER = 'O';
const MAX_WINS = 5;

function prompt(message) {
  console.log(`${message}`);
}

function pause() { // probably not the best way to pause...
  readline.question();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + 1;
}

function displayBoard(board) {
  console.clear();
  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

// creates board object, keys 1-9, initialized with ' '
function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function smartMenu(board, score) {
  let choices = Object.keys(board).map(key => {
    return board[key] !== ' ' ? ' ' : key;
  });

  console.log(`You (${HUMAN_MARKER}): ${score['Player']}  Computer (${COMPUTER_MARKER}): ${score['Computer']}`);
  console.log(`Ties: ${score['Ties']}   Total Matches: ${score['Total Matches']}\n`);
  console.log(`Choose |  ${choices[0]}|${choices[1]}|${choices[2]}`);
  console.log(`   a   |  ${choices[3]}|${choices[4]}|${choices[5]}`);
  console.log(`square |  ${choices[6]}|${choices[7]}|${choices[8]}\n`);
  console.log(`I choose: `);

}
// return an array of any keys on board object that still have value of ' '
function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function playerChoosesSquare(board, score) {
  let square;

  while (true) { // choose from array of keys that still exist based on ' ' presence
    smartMenu(board, score);
    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;

    prompt("\nSorry, that's not a valid choice. Press <enter> to choose again.");
    pause();
    displayBoard(board);
  }

  board[square] = HUMAN_MARKER;
}

function attackOrDefend(board, markerType) {  // pass COMPUTER_MARKER if attacking, HUMAN_MARKER if defending
  let square;
  for (let idx = 0; idx < WINNING_LINES.length; idx++) {
    let line = WINNING_LINES[idx];
    square = findAtRiskSquare(line, board, markerType);
    if (square) break;
  }

  return square ? square : '';
}

function computerChoosesSquare(board) {
  let square;
  square = attackOrDefend(board, COMPUTER_MARKER);
  if (!square) {
    square = attackOrDefend(board, HUMAN_MARKER);
  }

  if (board[5] === INITIAL_MARKER) {
    square = 5;
  }

  if (!square) {
    let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
    square = emptySquares(board)[randomIndex];
  }

  board[square] = COMPUTER_MARKER;
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return !!detectWinner(board);
}

function findAtRiskSquare(line, board, marker) {
  let markersInLine = line.map(square => board[square]);

  // if there are two HUMAN_MARKERs in one of the LINE elements above, find the empty element
  if (markersInLine.filter(val => val === marker).length === 2) {
    let unusedSquare = line.find(square => board[square] === INITIAL_MARKER);
    if (unusedSquare !== undefined) {
      return unusedSquare;
    }
  }

  return null;
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [ sq1, sq2, sq3 ] = WINNING_LINES[line];

    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }

  return null;
}

function chooseSquare(board, currentPlayer, score) {
  if (currentPlayer === 'player') {
    playerChoosesSquare(board, score);
  } else {
    computerChoosesSquare(board);
  }
}

function alternatePlayer(playerSelection) {
  return playerSelection === 'player' ? 'computer' : 'player';
}

function determineFirstPlayer() {
  /*The determineFirstPlayer() function is doing a lot. That's okay, but it can be cleaned up a bit. On line 198, you can go ahead and determine the first player and initialize a variable to the appropriate value. let firstPlayer = playerRolle > computerRoll ? 'player' : 'computer'.
Then you can use a template literal to display who the first player will be and then return firstPlayer. This allows you to remove the if/else statement and will make the function a bit less complex.*/
  prompt(`Press <enter> to roll (1-6) for first turn. First to five wins!`);
  pause();
  let computerRoll = getRandomInt(1, 6);
  let playerRoll = getRandomInt(1, 6);

  while (computerRoll === playerRoll) {
    computerRoll = getRandomInt(1, 6);
    playerRoll = getRandomInt(1, 6);
  }
  console.log(`You rolled [${playerRoll}] and computer rolled [${computerRoll}].\n`);
  if (playerRoll > computerRoll) {  // <--- previous line 198 from comment above
    console.log(`Player goes first!\n\nPress <enter> to begin!`);
    pause();
    return 'player';
  } else {
    console.log(`Computer goes first!\n\nPress <enter> to begin!`);
    pause();
    return 'computer';
  }
}

while (true) {
  console.clear();
  let score = { 'Player': 0, 'Computer': 0 , 'Ties': 0, 'Total Matches': 0};
  let startingPlayer = determineFirstPlayer();  // build from here

  while (Math.max(...Object.values(score)) < MAX_WINS) { //  <-- previous line 214
    /*The condition provided to your while loop on line 214 isn't as clear as it could be. Consider extracting the logic to determine the highest current score to a well-named function so that the condition reads something like this instead-- while (highestScore() < MAX_WINS).*/
    let board = initializeBoard();
    let currentPlayer = startingPlayer;

    while (true) {
      displayBoard(board);
      chooseSquare(board, currentPlayer, score);
      currentPlayer = alternatePlayer(currentPlayer);

      if (someoneWon(board)) {
        score[detectWinner(board)] += 1;
        score['Total Matches'] += 1;
        startingPlayer = alternatePlayer(startingPlayer);
        break;
      } else if (boardFull(board)) {
        score['Ties'] += 1;
        score['Total Matches'] += 1;
        startingPlayer = alternatePlayer(startingPlayer);
        break;
      }
    }

    displayBoard(board, score);

    if (someoneWon(board)) {
      prompt(`${detectWinner(board)} won! \n\nPress <enter> to continue.`);
      pause();
      displayBoard(board, score);
    } else {
      prompt(`It's a tie! \n\nPress <enter> to continue.`);
      pause();
    }

  }

  let winner = Object.keys(score).find(key => score[key] === MAX_WINS);

  console.log(`\nYou (${HUMAN_MARKER}):      ${score['Player']}`);
  console.log(`Computer (${COMPUTER_MARKER}): ${score['Computer']}`);
  prompt(`\n${winner} wins the series! Play again? (y or n)`);
  let answer = readline.question();

  while (!answer.match(/^([yn]|yes|no)$/i)) {
    prompt(`Please enter 'y' or 'n'.`);
    answer = readline.question();
  }
  if (answer[0] === 'n') break;

  /*Consider abstracting the logic of determining whether the user would like to play again to its own function, similar to the functions you wrote to collect other user input.
After doing so, line 260 could read something like this: if (!playAgain()) break;.*/
}

prompt(`Thanks for playing Tic Tac Toe!`);
