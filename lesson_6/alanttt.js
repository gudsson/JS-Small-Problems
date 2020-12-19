prompt(`Welcome to Tic-Tac-Toe!`)
let rlsync = require("readline-sync");

let frontBoard = [['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']];
            
let inputBoard = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
            
function displayBoard() {
  console.clear();
  console.log(frontBoard[0]);
  console.log(frontBoard[1]);
  console.log(frontBoard[2]);
}

function randomGenerator(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min).toString(10);
}

function prompt(string) {
  console.log(string);
}

function rlsPrompt(message) {
  return rlsync.question(message);
}

function everyMatch (array, target) {
  for (let i = 0; i < target.length; i++) {
    if (target[i].every(element => array.includes(element))) {
      return true;
    }
  }
}

function determineWinner() {
  if (everyMatch(playerChoices, winningCombinations)) {
    return 'player';
  } else if (everyMatch(computerChoices, winningCombinations)) {
    return 'computer';
  } else return 'none';
}

function determineGame() {
  let p = score.player;
  let c = score.computer;
  let g = switches.game;
  if (g > 5 && p > c) {
    return 'player';
  } else if (g > 5 && c > p) {
    return 'computer';
  } else if (g > 5 && c === p) {
    return 'tie';
  } else if (c === 3) {
    return 'computer';
  } else if (p === 3) {
    return 'player';
  }
}

function resetBoard() {
  frontBoard = [['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']];
}

function updateScore(winner) {
  score[winner] += 1;
}

function updateRound() {
  switches.games += 1;
}

function resetChoices(person) {
  person.length = 0;
}

function restartGame() {
        
  while (true) {
    
    let gameOver = rlsPrompt(`Would you like to play again? Enter 'y' or 'n': `).toString().toLowerCase().trim();
    
    if (gameOver === 'y') {
        resetBoard();
        resetChoices(computerChoices);
        resetChoices(playerChoices);
        switches.winner = 'none';
        switches.game = 0;
        score.player = 0;
        score.computer = 0;
        displayBoard();
        break;
      
    } else if (gameOver === 'n') { 
        switches.playAgain = false;
        prompt(`Thanks for playing! See you next time.`);
        break;
        
    } else {
      prompt(`Please enter 'y' or 'n'!`);
    }
   }
}

let winningCombinations = [
  ['1', '2', '3'],
  ['1', '5', '9'],
  ['1', '4', '7'],
  ['2', '5', '8'],
  ['3', '6', '9'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['7', '5', '3'],
  ];

let score = {player: 0, computer: 0};
  
let playerChoices = [];
let computerChoices = [];
  
let switches = {
  games : 0,
  playerChoice : 'none',
  computerChoice : 'none',
  winner : 'none',
  playAgain : true,
};

//  ----------------------------------------- END OF SETTINGS

// Display the initial empty 3x3 board.

displayBoard();

// Ask the user to mark a square.

while (switches.playAgain === true) {
  
  while (switches.winner === 'none') {
  
    let loop = true;
    while (loop) {
      
      switches.playerChoice = rlsPrompt(`Which tile would you like to mark? (Enter number): `);
      
      if (playerChoices.includes(switches.playerChoice) || computerChoices.includes(switches.playerChoice)) {
        prompt(`That tile has already been marked! Please choose again`);
      } else if (!inputBoard.includes(switches.playerChoice)) {
        prompt("Please enter a valid number.");
      } else {
        loop = false;
      }
    }
  
      playerChoices.push(switches.playerChoice);
      
      for (let i = 0; i < frontBoard.length; i++) {
        if (frontBoard[i].includes(switches.playerChoice)) {
          let index = frontBoard[i].indexOf(switches.playerChoice);
          frontBoard[i][index] = 'X';
        }
      }
      
  // If it's a winning board, display the winner.
    
    if (determineWinner() === 'player') {
      updateScore('player');
      updateRound();
      switches.winner = 'player';
    }
  
// Computer marks a square.
    
    while (true) {
      switches.computerChoice = randomGenerator(1, 9);
      if (computerChoices.length + playerChoices.length >= 9) {
        break;
        } else if (computerChoices.includes(switches.computerChoice) || playerChoices.includes(switches.computerChoice)) {
          switches.computerChoice = randomGenerator(1, 9);
        } else break;
      }
      
    if (switches.winner === 'none' && playerChoices.length + computerChoices.length <= 9) {
      computerChoices.push(switches.computerChoice);
    }
    
    for (let i = 0; i < frontBoard.length; i++) {
      if (frontBoard[i].includes(switches.computerChoice)) {
            let index = frontBoard[i].indexOf(switches.computerChoice);
            frontBoard[i][index] = 'O';
          }
        }
        
  // If it's a winning board, display the winner.
        
    if (determineWinner() === 'computer') {
      updateScore('computer');
      updateRound();
      switches.winner = 'computer';
    }
    
// Display the updated board state.
  
  displayBoard();
    
// If the board is full, display tie.
  
    if ((playerChoices.length + computerChoices.length >= 9) && 
    (determineWinner() !== 'player' && determineWinner() !== 'computer')) {
      updateRound();
      switches.winner = 'tie';
    }
  
// If neither player won and the board is not full, go to #2
  
  } // while switches.winner === 'none'
  
// If yes, go to #1
  
  if (switches.winner === 'tie') {
    prompt(`Game over! Tie game!`);
    
  } else {
    prompt(`Game over! The ${switches.winner} wins!`);
    
    prompt(`You have won ${score.player}, and the computer has won ${score.computer}.`);
  }
  
  while (true) {
    
    if (determineGame() === 'player') {
      prompt(`Match over! You have won.`);
      restartGame();
      break;
    } else if (determineGame() === 'computer') {
      prompt(`Match over! The computer has won.`);
      restartGame();
      break;
    } else if (determineGame() === 'tie') {
      prompt(`Match over! Tie game.`);
      break;
    } else  {
      resetBoard();
      resetChoices(computerChoices);
      resetChoices(playerChoices);
      switches.winner = 'none';
      displayBoard();
      prompt(`GAME ${switches.games + 1}: You have won ${score.player} and the computer has won ${score.computer}.`);
      break;
    }
  }

} // playAgain

// Goodbye!