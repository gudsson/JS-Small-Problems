////////////////
// Twenty-One //
////////////////

const readline = require('readline-sync');
const GAME_TITLE = 'Twenty-One';
const BUST_NUMBER = 21;
const DEALER_HITS_UNTIL = 17;
const HUMAN_PLAYER = 'player';
const CPU_PLAYER = 'dealer';
const PLAYERS = [CPU_PLAYER, HUMAN_PLAYER];
const CARD_SUITS = ['hearts', 'diamonds', 'spades', 'clubs'];
const FACE_CARDS = {
  J: 'Jack',
  Q: 'Queen',
  K: 'King',
  A: 'Ace',
};
// get from TTT
const PLAY_AGAIN_RESPONSES = ['yes', 'no'];
const SUIT_UTF = {
  hearts: String.fromCharCode(9829),
  diamonds: String.fromCharCode(9830),
  spades: String.fromCharCode(9824),
  clubs: String.fromCharCode(9827)
};
const CARD_WIDTH = 5;
// MATCH CONSTS
const MIN_MATCH_LENGTH = 1;
const MAX_MATCH_LENGTH = 100;
const POSSIBLE_MOVES = ['hit', 'stay'];

function joinOr(array, delimiter = ', ', outro = 'or') {
  // similar to Array.prototype.join(), but adds additional
  // outro word before last element in array instead of last comma
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

// done
function buildDeck() {
  let deck = [];

  CARD_SUITS.forEach(suit => {
    for (let idx = 2; idx <= 10; idx += 1) {
      deck.push([String(idx), suit]);
    }
    Object.values(FACE_CARDS).forEach(card => {
      deck.push([card[0], suit]);
    });
  });

  return deck;
}

// done
function shuffle(deck) {
  let shuffledDeck = [];

  while (deck.length) {
    let cardIdx = Math.floor(Math.random() * deck.length);
    let card = deck.splice(cardIdx, 1)[0];
    shuffledDeck.push(card);
  }
  return shuffledDeck;
}

// done
function initializeDeck() {
  return shuffle(buildDeck());
}

// done
function dealCard(deck) {
  return deck.shift();
}

function hit(hand, deck) {
  hand[Object.keys(hand)[0]].push(dealCard(deck));
  console.log(hand);
  return hand;
}

// get rid of? use differently?
function prompt(text) {
  console.log(`=> ${text}`);
}

// i think it's ok?
function dealCards(deck, numCards) {
  let cards = [];

  for (let idx = 0; idx < numCards; idx += 1) {
    cards.push(dealCard(deck));
  }

  return cards;
}

// I think it's ok?
function initializeScore(matchLength) {
  let score = {
    [PLAYERS[0]]: 0,
    [PLAYERS[1]]: 0,
    ties: 0,
    winsNeeded: matchLength
  };

  return score;
}

// get best-of-n functionality from TTT
function displayScore(score) {
  console.log(`Current Score:`);
  Object.keys(score).forEach(player => {
    console.log(`   ${player} Wins:   ${score[player]}`);
  });
  console.log('');
}

function cardImage(card) {
  let cardArr = [];
  let fill = ' ';
  let [val, suit] = [card[0], SUIT_UTF[card[1]]];
  let [valPad, suitPad] = [CARD_WIDTH - val.length, (CARD_WIDTH - 1) / 2];
  let valLine = `${val}${fill.repeat(valPad)}`;
  let suitLine = `${fill.repeat(suitPad)}${suit}${fill.repeat(suitPad)}`;

  // if card isn't known, replace show backside
  if (card === 'an unknown card') {
    fill = '/';
    [valLine, suitLine] = [fill.repeat(CARD_WIDTH), fill.repeat(CARD_WIDTH)];
  }

  // card image
  cardArr[0] = ` ${'_'.repeat(CARD_WIDTH)} `;
  cardArr[1] = `|${valLine}|`;
  cardArr[2] = `|${suitLine}|`;
  cardArr[3] = `|${fill.repeat(CARD_WIDTH)}|`;
  cardArr[4] = ` ${String.fromCharCode(8254).repeat(CARD_WIDTH)} `;

  return cardArr;
}

// done
function displaycardImages(cards) {
  let display = [];
  for (let line = 0; line <= 4; line++) {
    let displayLine = [];
    for (let card = 0; card < cards.length; card++) {
      displayLine.push(cards[card][line]);
    }
    display.push(displayLine.join(' '));
  }
  display.forEach(line => console.log(line));
}

function total(hand) {
  //this doesn't go well.
  console.log(hand);
  console.log('hand: ' + hand);
  let player = Object.keys(hand)[0];
  let values = hand[player];
  let sum = 0;

  values.forEach(value => {
    if (value[0] === "A") {
      sum += 11;
      // no me gusta
    } else if (['J', 'Q', 'K'].includes(value[0])) {
      sum += 10;
    } else {
      sum += Number(value[0]);
    }
  });

  // correct for Aces
  values.filter(value => value[0] === "A").forEach(_ => {
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

// refactor clean card name
function displayHand(cards, obscure = false) {
  let hand = Object.values(cards)[0];
  let player = Object.keys(cards)[0];

  // obsecure dealer's second card when needed
  if (obscure) {
    hand[hand.length - 1] = 'an unknown card';
  }

  let cardImages = hand.map(card => cardImage(card));

  // combine card name and value into clean description
  let cardNames = hand.map(card => {
    return (FACE_CARDS[card[0]]) ? [FACE_CARDS[card[0]], card[1]] : card;
  }).map(card => {
    return Array.isArray(card) ? card.map(part => capitalize(part)).join(' of ') : card;
  });

  displaycardImages(cardImages);
  console.log(`${capitalize(player)} has: ${joinOr(cardNames,", ","and")}.\n`);
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
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

// done
function initializeMatchup() {
  console.log("MATCH SETUP");
  console.log("===========\n");
  let matchLength = Number(getMatchLength());
  let score = initializeScore(matchLength);
  console.clear();
  return score;
}

// done
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

  return matchLength;
}

function hitOrStay() {
  // let msg =
  //   (matchWinner) ? 'Start a new match?' : 'Continue to next game?';

  while (true) {
    console.log("Hit or stay?");
    let answer = readline.question('=> ').replace(/[^a-z]/,'').toLowerCase();

    // check if answer contains hit, stay or starts with h or s (after cleaning)
    let verifiedAnswer = POSSIBLE_MOVES.map(response => {
      if (response.includes(answer) || answer.includes(response)) return true;
      else return false;
    }).some(_ => true);

    // check if answer contains verified response but does not contain
    // ambiguous response (simultaneously yes and no).
    if (verifiedAnswer && !(answer.includes('h') && (answer.includes('s')))) {
      if (answer[0] === 's') {
        console.log(`\n${capitalize(HUMAN_PLAYER)} stays.\n`);
        return 'stay';
      } else if (answer[0] === 'h') {
        console.log(`\n${capitalize(HUMAN_PLAYER)} hits.\n`);
        return 'stay';
      }
    }

    console.log('\nAmbiguous response. Re-enter choice:\n');
  }
//////

  // let answer = readline.question('=> ');
  // // do better job getting hit or stay, check ambiguous.
  // console.log('');

  // return

  // if (answer === 'stay' || busted(playerHand, deck, true)) break;
}

//Start Match
printTitle(GAME_TITLE);
let score = initializeMatchup();

while (true) { //Start Individual Game
  let deck = initializeDeck();
  let dealerHand = { [CPU_PLAYER]: dealCards(deck, 2)};
  let playerHand = { [HUMAN_PLAYER]: dealCards(deck, 2)};

  while (true) {

    printTitle(GAME_TITLE);          //
    displayHand(dealerHand, true);   // make into displayRound at end?
    displayHand(playerHand);         //

    let answer = hitOrStay();
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

console.log(`\nThanks for playing ${GAME_TITLE}!`);