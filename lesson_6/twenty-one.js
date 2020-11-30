////////////////
// Twenty-One //
////////////////

const readline = require('readline-sync');
const GAME_TITLE = 'Twenty-One';
const BUST_NUMBER = 21;
const DEALER_HITS_UNTIL = 17;
const HUMAN_PLAYER = 'Player';
const CPU_PLAYER = 'Dealer';
const CARD_SUITS = ['heart', 'diamonds', 'spades', 'clubs'];
const FACE_CARDS = {
  J: 'Jack',
  Q: 'Queen',
  K: 'King',
  A: 'Ace',
};
const PLAY_AGAIN_RESPONSES = ['yes', 'no'];

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

function buildDeck() {
  let deck = [];

  CARD_SUITS.forEach(suit => {
    for (let idx = 2; idx <= 10; idx += 1) {
      deck.push([String(idx), suit]);
    }
    Object.values(FACE_CARDS).forEach(card => {
      deck.push([card, suit]);
    });
  });

  return deck;
}

function shuffle(deck) {
  let shuffledDeck = [];

  while (deck.length) {
    let cardIdx = Math.floor(Math.random() * deck.length);
    let card = deck.splice(cardIdx, 1)[0];
    shuffledDeck.push(card);
  }
  return shuffledDeck;
}

function initializeDeck() {
  return shuffle(buildDeck());
}

function dealCard(deck) {
  return deck.shift()[0];
}

function hit(hand, deck) {
  hand[Object.keys(hand)[0]].push(dealCard(deck));
  return hand;
}

function prompt(text) {
  console.log(`=> ${text}`);
}

function dealCards(deck, numCards) {
  let cards = [];

  for (let idx = 0; idx < numCards; idx += 1) {
    cards.push(dealCard(deck));
  }

  return cards;
}

function initializeScore(players) {
  let score = {};
  players.forEach(player => {
    score[player] = 0;
  });

  return score;
}

function displayScore(score) {
  console.log(`Current Score:`);
  Object.keys(score).forEach(player => {
    console.log(`   ${player} Wins:   ${score[player]}`);
  });
  console.log('');
}

function total(hand) {
  let player = Object.keys(hand)[0];
  let values = hand[player];
  let sum = 0;

  values.forEach(value => {
    if (value === "Ace") {
      sum += 11;
    } else if (['Jack', 'Queen', 'King'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  // correct for Aces
  values.filter(value => value === "Ace").forEach(_ => {
    if (sum > BUST_NUMBER) sum -= 10;
  });

  return sum;
}

function busted(hand, deck = [], hitPlayer = false) {
  if (hitPlayer) {
    hit(hand, deck);
  }
  return (total(hand) > BUST_NUMBER);
}

function displayHand(cards, obscure = false) {

  let displayCards = Object.values(cards)[0].map(card => card);
  let player = Object.keys(cards)[0];

  if ((player === CPU_PLAYER) && (obscure)) {
    displayCards[displayCards.length - 1] = 'unknown card';
  }

  console.log(`${player} has: ${joinOr(displayCards,", ","and")}`);
}

function printTitle(title) {
  let titleStr = ` Welcome to ${title} `;

  console.clear();
  console.log(`+${'-'.repeat(titleStr.length)}+`);
  console.log(`|${titleStr}|`);
  console.log(`+${'-'.repeat(titleStr.length)}+`);
  console.log('');

  return null;
}

function playAgain() {
  while (true) {
    console.log('Play again? (y or n)');
    let answer = readline.question().toLowerCase();
    let verifiedAnswer = PLAY_AGAIN_RESPONSES.map(response => {
      if (response.includes(answer) || answer.includes(response)) {
        return true;
      } else return false;
    }).some(_ => true);

    if (verifiedAnswer) {
      if (answer[0] === 'n') return false;
      if (answer[0] === 'y') return true;
    }

    console.log('Ambiguous response. Re-enter choice:');
  }
}

function someoneWon(playerHand, dealerHand) {
  return (total(playerHand) !== total(dealerHand));
}

function getWinner(playerHand, dealerHand) {
  if (total[playerHand] > total[dealerHand]) {
    return HUMAN_PLAYER;
  } else {
    return CPU_PLAYER;
  }
}

//Start Match
printTitle(GAME_TITLE);
let score = initializeScore([CPU_PLAYER, HUMAN_PLAYER]);

while (true) { //Start Individual Game
  let deck = initializeDeck();
  let dealerHand = { [CPU_PLAYER]: dealCards(deck, 2)};
  let playerHand = { [HUMAN_PLAYER]: dealCards(deck, 2)};

  while (true) {
    displayHand(dealerHand, true);
    displayHand(playerHand);
    prompt("hit or stay?");
    let answer = readline.question();
    console.log('');

    if (answer === 'stay' || busted(playerHand, deck, true)) break;
  }

  if (busted(playerHand)) {
    displayHand(playerHand);
    console.log(`Bust! ${HUMAN_PLAYER} has ${total(playerHand)}.`);
    console.log(`${CPU_PLAYER} wins.\n`);
    score[CPU_PLAYER] += 1;
  } else {

    while (total(dealerHand) <= DEALER_HITS_UNTIL) {
      displayHand(dealerHand);
      if (busted(dealerHand, deck, true)) break;
      displayHand(dealerHand);
      console.log(`${CPU_PLAYER} has ${total(dealerHand)}.\n`);
    }

    displayHand(dealerHand);

    if (busted(dealerHand)) {
      console.log(`Bust! ${CPU_PLAYER} has ${total(dealerHand)}.`);
      console.log(`${HUMAN_PLAYER} wins.\n`);
      score[HUMAN_PLAYER] += 1;
    } else if (someoneWon(playerHand, dealerHand)) {
      let winner = getWinner(playerHand, dealerHand);
      let scores = [total(playerHand), total(dealerHand)];
      scores.sort((a, b) => b - a);

      console.log(`${winner} wins (${scores[0]} to ${scores[1]}).\n`);

      score[winner] += 1;
    } else {
      console.log(`It's a tie.\n`);
    }
  }

  displayScore(score);
  if (!playAgain()) break;
  printTitle(GAME_TITLE);
}

console.log('');
console.log(`Thanks for playing ${GAME_TITLE}!`);