const readline = require('readline-sync');
const GAME_NAME = 'Tic-Tac-Toe';

// COMPETITOR CONSTS
// do not start both names with same letter
const PLAYERS = ['player', 'computer'];
const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'X';
const CPU_MARKER = 'O';

// MATCH CONSTS
const MIN_MATCH_LENGTH = 1;
const MAX_MATCH_LENGTH = 100;
const WINNING_LINES = [
  [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9],
  [1, 5, 9], [3, 5, 7]
];
const PLAY_AGAIN_RESPONSES = ['yes', 'no'];

function displayGameTitle(name) {
  let preferredBannerWidth = 40;
  let greeting = 'Welcome to';
  let title = `${greeting} ${name.toUpperCase()}!`;

  // for padding, if title exceeds preferred width, just add single
  // space padding to each side.
  let padding = Math.max(
    Math.floor((preferredBannerWidth - 4 - title.length) / 2), 1);

  console.clear();
  console.log(`+${'-'.repeat(title.length + (padding * 2))}+`);
  console.log(`|${' '.repeat(padding)}${title}${' '.repeat(padding)}|`);
  console.log(`+${'-'.repeat(title.length + (padding * 2))}+`);
  console.log(``);
}

function initializeMatchup(wentFirstLastGame = null) {
  console.log("MATCH SETUP");
  console.log("===========\n");
  let matchLength = Number(getMatchLength());
  let score = initializeScore(matchLength);
  let currentPlayer =
    (!wentFirstLastGame) ? getFirstMove() : alternatePlayer(wentFirstLastGame);

  return [score, currentPlayer];
}

function getMatchLength() {
  let matchLength = 1;
  let invalidMsg = "Sorry, that's not a valid choice.  Pick a number between " +
    ` ${MIN_MATCH_LENGTH} and ${MAX_MATCH_LENGTH}:`;

  console.log(`Match Length: How many games must you win to take the match?`);
  while (true) {
    matchLength = Number(readline.question(`=> First to `));

    // verify match length
    if (matchLength >= MIN_MATCH_LENGTH
      && matchLength <= MAX_MATCH_LENGTH) break;
    console.log(invalidMsg);
  }

  console.log(`\nFirst to ${matchLength} wins!  Good luck!\n`);
  return matchLength;
}

function getFirstMove() {
  let goesFirst;
  let invalidMsg = `Sorry, that's not a valid choice.  Pick again.`;

  // guard against user inputting both user names at the same time.
  // if length exceeds longest name, reprompt for input
  let maxNameLen = Math.max(...PLAYERS.map(name => name.length));

  firstMoveMsg();

  while (true) {
    goesFirst = readline.question(`=> `).trim().toLowerCase();

    // check if input matches a valid player name.
    if (goesFirst.length <= maxNameLen
      && (goesFirst.includes(PLAYERS) || PLAYERS[0].includes(goesFirst)
      || PLAYERS[1].includes(goesFirst))) break;

    console.log(invalidMsg);
  }

  // return player name that best matches
  return PLAYERS.filter(name => name[0] === goesFirst)[0];
}

function firstMoveMsg() {
  let intro = `Who gets to start Game 1?:`;
  let note = `(First move will alternate between players each game).`;
  let players = PLAYERS.map(name => `${capitalize(name)} (${name[0]})`);
  console.log(`${intro} ${note}\n${joinOr(players, '', "or")}:`);
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function buildBoard(board) {
  // Get labels for unclaimed squares.
  let labels = getUnclaimedSquareLabels(board);

  console.log(` ${labels['1']}       | ${labels['2']}       | ${labels['3']}`);
  console.log('         |         |');
  console.log(`    ${board['1']}    |    ${board['2']}    |    ${board['3']}`);
  console.log('         |         |\n         |         |');
  console.log('---------+---------+---------');
  console.log(` ${labels['4']}       | ${labels['5']}       | ${labels['6']}`);
  console.log('         |         |');
  console.log(`    ${board['4']}    |    ${board['5']}    |    ${board['6']}`);
  console.log('         |         |\n         |         |');
  console.log('---------+---------+---------');
  console.log(` ${labels['7']}       | ${labels['8']}       | ${labels['9']}`);
  console.log('         |         |');
  console.log(`    ${board['7']}    |    ${board['8']}    |    ${board['9']}`);
  console.log('         |         |\n         |         |\n');
}

function displayBoard(board) {
  console.log(`You are ${HUMAN_MARKER}. Computer is ${CPU_MARKER}.\n`);
  buildBoard(board);
}

function getUnclaimedSquareLabels(board) {
  // if square is empty, show label (i.e. set equal to square number)
  // else push initial marker

  let labels = {};
  Object.keys(board).forEach(key => {
    if (board[key] === INITIAL_MARKER) labels[key] = key;
    else labels[key] = INITIAL_MARKER;
  });

  return labels;
}

function initializeScore(matchLength) {
  let score = {
    [PLAYERS[0]]: 0,
    [PLAYERS[1]]: 0,
    ties: 0,
    winsNeeded: matchLength
  };

  return score;
}

function displayScore(score, screenClear = true) {
  if (screenClear) console.clear();
  let title = `Current Score`;
  let colonPosition = title.length
    + Math.max(...PLAYERS.map(name => name.length)) + 2;
  let padding = [
    ' '.repeat(colonPosition - PLAYERS[0].length - title.length),
    ' '.repeat(colonPosition - PLAYERS[1].length - title.length),
    ' '.repeat(colonPosition - 'Ties'.length)
  ];

  // Scoreboard Line 1
  console.log(`${title}${padding[0]}${capitalize(PLAYERS[0])}:   `
    + `${score[PLAYERS[0]]} ${pluralize('win', score[PLAYERS[0]])}`);

  // Scoreboard Line 2
  console.log(`${'='.repeat(title.length)}${padding[1]}${capitalize(PLAYERS[1])}:   `
    + `${score[PLAYERS[1]]} ${pluralize('win', score[PLAYERS[1]])}`);

  // Scoreboard Line 3
  console.log(`${padding[2]}Ties:   `
    + `${score.ties} ${pluralize('tie', score.ties)}\n`);
}

function pluralize(result, score) {
  if (score !== 1) return result + 's';
  else return result;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === INITIAL_MARKER);
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWonGame(board) {
  return !!detectGameWinner(board);
}

function someoneWonMatch(score) {
  // check if one player has required number of wins
  return (Math.max(score[PLAYERS[0]], score[PLAYERS[1]]) === score.winsNeeded);
}

function detectGameWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [ sq1, sq2, sq3 ] = WINNING_LINES[line];

    if (
      board[sq1] === HUMAN_MARKER
      && board[sq2] === HUMAN_MARKER
      && board[sq3] === HUMAN_MARKER
    ) return PLAYERS[0];
    else if (
      board[sq1] === CPU_MARKER
      && board[sq2] === CPU_MARKER
      && board[sq3] === CPU_MARKER
    ) return PLAYERS[1];
  }

  return null;
}

function detectMatchWinner(score) {
  if (score[PLAYERS[0]] === score.winsNeeded) {
    return PLAYERS[0];
  } else if (score[PLAYERS[1]] === score.winsNeeded) {
    return PLAYERS[1];
  } else return null;
}

function chooseSquare(board, currentPlayer) {
  if (currentPlayer === PLAYERS[1]) {
    computerChoosesSquare(board);
  } else playerChoosesSquare(board);
}

function alternatePlayer(currentPlayer) {
  return (currentPlayer === PLAYERS[0]) ? PLAYERS[1] : PLAYERS[0];
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    console.log(`Your move.  `
      + `Choose a square (${joinOr(emptySquares(board), ', ', "or")})`);
    square = readline.question(`=> `).replace(/[^1-9]/,'');

    if (emptySquares(board).includes(square)) break;
    console.log("Sorry, that's not a valid choice.");
  }
  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {
  let squaresToAttack = findAtRiskSquares(board, CPU_MARKER);
  let squares = [];
  let square;

  if (squaresToAttack.length > 0) {
    let squaresToDefend = findAtRiskSquares(board, HUMAN_MARKER);
    if (squaresToDefend.length > 0) squares = emptySquares(board);
    else squares = squaresToDefend;
  } else squares = squaresToAttack;

  // take middle square if available and no need to defend
  if (squares.includes(String(5))) {
    square = 5;
  } else {
    square = squares[Math.floor(Math.random() * squares.length)];
  }

  board[square] = CPU_MARKER;
}

function findAtRiskSquares(board, marker) {
  let atRiskSquares = [];
  let winningLines = WINNING_LINES.map(line => line.map(square => {
    return ([square, board[String(square)]]);
  }));

  winningLines.forEach(line => {
    let markArr = line.map(element => element[1]);
    let idxArr = line.map(element => element[0]);

    if (markArr.filter(val => val === marker).length === 2 &&
    markArr.includes(INITIAL_MARKER)) {
      atRiskSquares.push(idxArr[markArr.indexOf(INITIAL_MARKER)]);
    }
  });

  return atRiskSquares;
}

function getGameResult(board) {
  let pointGoesTo = '';

  if (someoneWonGame(board)) pointGoesTo = detectGameWinner(board);
  else pointGoesTo = `ties`;

  return pointGoesTo;
}

function printGameResult(result) {
  if (result === 'ties') return console.log(`It's a tie.`);
  else return console.log(`${capitalize(result)} won!`);
}

function playAgain(matchWinner = null) {
  let msg =
    (matchWinner) ? 'Start a new match?' : 'Continue to next game?';

  while (true) {
    console.log(`${msg} (y or n)`);
    let answer = readline.question('=> ').replace(/[^a-z]/,'').toLowerCase();

    // check if answer contains y, n, yes or no (after cleaning)
    let verifiedAnswer = PLAY_AGAIN_RESPONSES.map(response => {
      if (response.includes(answer) || answer.includes(response)) return true;
      else return false;
    }).some(_ => true);

    // check if answer contains verified response but does not contain
    // ambiguous response (simultaneously yes and no).
    if (verifiedAnswer
      && !(answer.includes('y') && (answer.includes('n')))) {
      if (answer[0] === 'n') return false;
      if (answer[0] === 'y') return true;
    }

    console.log('\nAmbiguous response. Re-enter choice:');
  }
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function joinOr(array, delimiter = ', ', outro = 'or') {
  // similar to Array.prototype.join(), but adds additional
  // outro word before last element in array instead of last comma
  if (array.length < 3) {
    delimiter = ' ';
    if (array.length < 2) outro = '';
  }

  return array.map((value, idx) => {
    if (idx === array.length - 1) return `${outro} ${value}`;
    else return value;
  }).join(delimiter).trim();
}

// GAME PROGRAM //
displayGameTitle(GAME_NAME);

// Initialize Best-of-N Matchup
let [score, currentPlayer] = initializeMatchup();

while (true) {
  // initialize new game in series
  let board = initializeBoard();

  // main gameplay loop
  while (true) {
    displayScore(score);
    displayBoard(board);
    chooseSquare(board, currentPlayer);
    currentPlayer = alternatePlayer(currentPlayer);
    if (someoneWonGame(board) || boardFull(board)) break;
  }

  // get result at end of each game
  let result = getGameResult(board);
  score[result] += 1;

  // Display final board and game result
  displayScore(score);
  displayBoard(board);
  printGameResult(result);

  // check match result
  if (someoneWonMatch(score)) {
    let matchWinner = detectMatchWinner(score);
    console.log(`${capitalize(matchWinner)} is first to ${score.winsNeeded} and wins the match!\n`);

    // if match is over, see if user wants to play again.
    if (playAgain(matchWinner)) {
      [score, currentPlayer] = initializeMatchup();
    } else break;
  } else if (!playAgain()) break; // else see if user wants to continue series
}

// user quit. log exit message.
console.log('\nThanks for playing Tic Tac Toe!');