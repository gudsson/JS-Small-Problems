const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const CPU_MARKER = 'O';
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]
];
const MATCH_THRESHOLD = 5;

function displayBoard(board) {
  // console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${CPU_MARKER}`);

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

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function initializeScore() {
  let score = {
    Player: 0,
    Computer: 0,
  };

  return score;
}

function displayScore(score) {
  prompt(`Current Score:`);
  prompt(`   Player:   ${score.Player}`);
  prompt(` Computer:   ${score.Computer}`);
}

function joinOr(array, delimiter = ', ', outro = 'or') {
  if (array.length < 3) {
    delimiter = ' ';
    if (array.length < 2) outro = '';
  }

  return array.map((value, idx) => {
    if (idx === array.length - 1) {
      return `${outro} ${value}`;
    } else return value;
  }).join(delimiter).trim();
}

function prompt(text) {
  console.log(`=> ${text}`);
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) { // board is unused for now; we'll use it later
  return !!detectWinner(board);
}

function someoneWonMatch(score) {
  let arr = Object.values(score);
  return (Math.max(...arr) === MATCH_THRESHOLD);
}

function detectMatchWinner(score) {
  if (score.Player === MATCH_THRESHOLD) {
    return 'Player';
  } else if (score.Computer === MATCH_THRESHOLD) {
    return 'Computer';
  } else {
    return null;
  }
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [ sq1, sq2, sq3 ] = WINNING_LINES[line];

    if (
      board[sq1] === HUMAN_MARKER && board[sq2] === HUMAN_MARKER
      && board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
      board[sq1] === CPU_MARKER && board[sq2] === CPU_MARKER &&
      board[sq3] === CPU_MARKER
    ) { return 'Computer' }
  }

  return null;
}

function playerChoosesSquare(board) {
  let square; // declared here so we can use it outside the loop

  while (true) {
    // prompt(`Choose a square (${emptySquares(board).join(', ')}):`);
    prompt(`Choose a square (${joinOr(emptySquares(board), ', ', "or")})`);
    square = readline.question().trim(); // input trimmed to allow spaces in input

    if (emptySquares(board).includes(square)) break;
    prompt("Sorry, that's not a valid choice.");
  }
  board[square] = HUMAN_MARKER;
}

function checkThreats(board) {
  let squaresToDefend = [];
  let winningLines = WINNING_LINES.map(line => line.map(square => {
    return ([square, board[String(square)]]);
  }));

  winningLines.forEach(line => {
    let markArr = line.map(element => element[1]);
    let idxArr = line.map(element => element[0]);

    if (markArr.filter(val => val === HUMAN_MARKER).length === 2 &&
    markArr.includes(INITIAL_MARKER)) {
      squaresToDefend.push(idxArr[markArr.indexOf(INITIAL_MARKER)]);
    }
  });

  return squaresToDefend;
}

function computerChoosesSquare(board) {
  let threats = checkThreats(board);
  let squares = (threats.length) ? threats : emptySquares(board);
  let randomIndex = Math.floor(Math.random() * squares.length);
  // let square = emptySquares(board)[randomIndex];
  let square = squares[randomIndex];

  // console.log(immediateThreats);
  board[square] = CPU_MARKER;
}

let score = initializeScore();

while (true) {
  let board = initializeBoard();

  while (true) {
    displayBoard(board);

    playerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) break;

    computerChoosesSquare(board);
    if (someoneWon(board) || boardFull(board)) break;
  }

  displayBoard(board);

  if (someoneWon(board)) {
    let winner = detectWinner(board);
    prompt(`${detectWinner(board)} won!`);
    score[winner] += 1;
  } else {
    prompt(`It's a tie!`);
  }

  displayScore(score);

  if (someoneWonMatch(score)) {
    let matchWinner = detectMatchWinner(score);
    prompt(`${matchWinner} is first to ${MATCH_THRESHOLD} and wins the match!`);
    score = initializeScore();
  }

  prompt('Play again? (y or n)');
  let answer = readline.question().toLowerCase()[0];
  if (answer !== 'y') break;
}

prompt('Thanks for playing Tic Tac Toe!');
