const readline = require('readline-sync');
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const CPU_MARKER = 'O';

function displayBoard(board) {
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

function prompt(text) {
  console.log(`=> ${text}`);
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function playerChoosesSquare(board) {
  let square; // declared here so we can use it outside the loop

  while (true) {
    prompt(`Choose a square (${emptySquares(board).join(', ')}):`);
    square = readline.question().trim(); // input trimmed to allow spaces in input

    if (emptySquares(board).includes(square)) break;
    prompt("Sorry, that's not a valid choice.");
  }
  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {
  let randomIndex = Math.floor(Math.random() * emptySquares(board).length);
  let square = emptySquares(board)[randomIndex];

  board[square] = CPU_MARKER;
}

let board = initializeBoard();
displayBoard(board);

playerChoosesSquare(board);
computerChoosesSquare(board);

displayBoard(board);

