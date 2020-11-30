////////////////
// Twenty-One //
////////////////

// Deck: Start with a standard 52-card deck consisting of the 4 suits
// (Hearts, Diamonds, Clubs, and Spades), and 13 values
// (2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace).

// Goal: The goal of Twenty-One is to try to get as close
// to 21 as possible without going over. If you go over 21,
// it's a bust, and you lose.

// Setup: The game consists of a dealer and a player. Both
// participants are initially dealt two cards. The player can
// see their 2 cards, but can only see one of the dealer's cards.

// Card values: All of the card values are pretty straightforward,
// except for the Ace. The cards with numbers 2 through 10 are worth
// their face value. The Jack, Queen, and King are each worth 10.
// The Ace can be worth 1 or 11 depending on circumstances. Its
// value is determined each time a new card is drawn from the deck.
// For example, if the hand contains a 2, an Ace, and a 5, then the
// total value of the hand is 18. In this case, the Ace is worth 11
// because the sum of the hand (2 + 11 + 5) doesn't exceed 21. Now,
// say another card is drawn, and it happens to be an Ace. Your
// program must determine the value of both Aces. If the sum of
// the hand (2 + 11 + 5 + 11) exceeds 21, then one of the Aces
// must be worth 1, resulting in the hand's total value being 19.
// What happens if another card is drawn and it also happens to
// be an Ace? It can get tricky if there are multiple Aces in a
// hand, so your program must account for that.

// Card Value
// 2 - 10 face value
// Jack, Queen, King 10
// Ace 1 or 11
// Player turn: The player always goes first, and can decide
// to either hit or stay. A hit means the player wants to be dealt
// another card. Remember, if his total exceeds 21, he will bust
// and lose the game. The decision to hit or stay depends on the
// player's cards and what the player thinks the dealer has. For
// example, if the dealer is showing a "10" (the other card is
// hidden), and the player has a "2" and a "4", then the obvious
// choice is for the player to hit. The player can continue to
// hit as many times as they want. The turn is over when the
// player either busts or stays. If the player busts, the game
// is over, and the dealer won.

// Dealer turn: When the player stays, it's the dealer's turn.
// The dealer must follow a strict rule for determining whether
// to hit or stay: hit until the total is at least 17. If the
// dealer busts, then the player wins.

// Comparing cards: When both the player and the dealer stay,
// it's time to compare the total value of the cards and see who
// has the highest value.
const readline = require('readline-sync');
const GAME_TITLE = 'Twenty-One';
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

function total(cards) {
  // cards = [['H', '3'], ['S', 'Q'], ... ]
  let values = cards.map(card => card[1]);

  let sum = 0;
  values.forEach(value => {
    if (value === "A") {
      sum += 11;
    } else if (['J', 'Q', 'K'].includes(value)) {
      sum += 10;
    } else {
      sum += Number(value);
    }
  });

  // correct for Aces
  values.filter(value => value === "A").forEach(_ => {
    if (sum > 21) sum -= 10;
  });

  return sum;
}

function dealCard(deck) {
  return deck.shift()[0];
}

function hit(hand, deck) {
  hand[Object.keys(hand)[0]].push(dealCard(deck));
  return hand;
}

function dealCards(deck, numCards) {
  let cards = [];

  for (let idx = 0; idx < numCards; idx += 1) {
    cards.push(dealCard(deck));
  }

  return cards;
}

function initializeScore(players) {
  // let score = {
  //   Player: 0,
  //   Computer: 0,
  // };

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

function total2(hand) {
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
    if (sum > 21) sum -= 10;
  });

  return sum;
}

// function playerBusted(hand) {
//   let score = total2(hand);

//   if (score > 21) {
//     return true;
//   } else return false;
// }

// function dealerBusted(hand) {
//   let score = total2(hand);

//   if (score > 16) {
//     return true;
//   } else return false;
// }

function busted(hand, deck, hitPlayer = false) {
  // let busted;
  // let player = Object.keys(hand)[0];
  // let total = total2(hand);
  // let cards = Object.values(hand)[0];
  // console.log();
  if (hitPlayer) {
    hit(hand, deck);
  }
  // if ((total2(hand) <= 21)) hit(hand, deck);
  return (total2(hand) > 21);

  // if (player === HUMAN_PLAYER || total2(hand) > 16) {
  //   hit(hand, deck);
  // } //else stay

  //TODO: check for busting

  // let player = Object.keys(hand)[0];
  // hit(hand, deck);
  // if (player === HUMAN_PLAYER) {
  //   // busted
  // }
  // // console.log(hand);
  // console.log(total2(hand));
  // return false;
}

function displayHand(cards) {
  let displayCards = Object.values(cards).slice(0)[0];
  let player = Object.keys(cards)[0];
  if ((player === CPU_PLAYER) && (displayCards.length === 2)) {
    displayCards[1] = 'unknown card';
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
  return (total2(playerHand) !== total2(dealerHand));
}

function getWinner(playerHand, dealerHand) {
  if (total2[playerHand] > total2[dealerHand]) {
    return Object.keys(playerHand)[0];
  } else {
    return Object.keys(dealerHand)[0];
  }
}

//Start Match
printTitle(GAME_TITLE);
let score = initializeScore([CPU_PLAYER, HUMAN_PLAYER]);
// displayScore(score);

while (true) {
  //Start Individual Game
  let deck = initializeDeck();
  let dealerHand = { [CPU_PLAYER]: dealCards(deck, 2)};
  let playerHand = { [HUMAN_PLAYER]: dealCards(deck, 2)};

  // displayHand(dealerHand);

  while (true) {
    displayHand(dealerHand);
    displayHand(playerHand);
    console.log("hit or stay?");
    let answer = readline.question();
    console.log('');

    // if player doesn't stay, hit them and check if busted
    if (answer === 'stay' || busted(playerHand, deck, true)) break;
  }

  if (busted(playerHand, deck)) { //game ends
    displayHand(playerHand);
    console.log(`Bust! ${HUMAN_PLAYER} has ${total2(playerHand)}.`);
    console.log(`${CPU_PLAYER} wins.\n`);
    score[CPU_PLAYER] += 1;
  } else {
    // dealer starts to play
    console.log('stayed. dealer starts to play');

    while (total2(dealerHand) <= 17) { //dealer has to hit
      if (busted(dealerHand, deck, true)) break; //busted
      console.log(`${CPU_PLAYER} has ${total2(dealerHand)}.\n`);
    }

    if (busted(dealerHand, deck)) { //dealer busts
      displayHand(dealerHand);
      console.log(`Bust! ${CPU_PLAYER} has ${total2(playerHand)}.`);
      console.log(`${HUMAN_PLAYER} wins.\n`);
      score[HUMAN_PLAYER] += 1;
    } else { //both players stayed
        if (someoneWon(playerHand, dealerHand)) {
          // let winner = getWinner(playerHand, dealerHand);
          // console.log(`${winner} wins.`);
          // score[winner] += 1;
        } else {
          console.log(`It's a tie.`)
        }
    }
    // dealerPlays(dealerHand);
  //   console.log("You chose to stay!");
  // if player didn't bust, must have stayed to get here
  }

  // if (someoneWonMatch(score)) {
  //   let matchWinner = detectMatchWinner(score);
  //   prompt(`${matchWinner} is first to ${MATCH_THRESHOLD} and wins the match!`);
  //   score = initializeScore();
  // }
  displayScore(score);
  if (!playAgain()) break;
  printTitle(GAME_TITLE);
}

console.log(`Thanks for playing ${GAME_TITLE}!`);