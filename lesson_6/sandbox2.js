// // const readline = require('readline-sync');

// // let firstPlayer;
// // firstPlayer = readline.question(`=> First to `); // input trimmed to allow spaces in input

// // console.log(firstPlayer);
// const PLAYERS = ['player', 'computer'];

// //done
// function initializeScore() {
//   let score = {
//     [PLAYERS[0]]: 0,
//     [PLAYERS[1]]: 0,
//     Ties: 0,
//   };

//   return score;
// }

// console.log(initializeScore());

const names = ['123', 'dsfdsfads'];

console.log(Math.max(...names.map(name => name.length)));