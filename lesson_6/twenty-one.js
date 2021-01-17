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
// get from TTT
const PLAY_AGAIN_RESPONSES = ['yes', 'no'];
const SUIT_UTF16 = {
  heart: String.fromCharCode(9825),
  diamonds: String.fromCharCode(9826),
  spades: String.fromCharCode(9828),
  clubs: String.fromCharCode(9831)
};
const CARD_WIDTH = 5;

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
function initializeScore(players) {
  let score = {};
  players.forEach(player => {
    score[player] = 0;
  });

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

function cardImage(card = null) {
  let cardArr = [];
  let [val, suit] = (!card) ? ['',''] : [card[0], SUIT_UTF16[card[1]]];
  let [valPad, suitPad] = [CARD_WIDTH - val.length, (CARD_WIDTH - 1) / 2];
  let [top, bot, side, fill] = ['_', String.fromCharCode(8254), '|', ' '];
  let valLine = `${val}${fill.repeat(valPad)}`;
  let suitLine = `${fill.repeat(suitPad)}${suit}${fill.repeat(suitPad)}`;

  // if card isn't known, replace show backside
  if (!card) {
    fill = '/';
    [valLine, suitLine] = [fill.repeat(CARD_WIDTH), fill.repeat(CARD_WIDTH)];
  }

  cardArr[0] = ` ${top.repeat(CARD_WIDTH)} `;
  cardArr[1] = `${side}${valLine}${side}`;
  cardArr[2] = `${side}${suitLine}${side}`;
  cardArr[3] = `${side}${fill.repeat(CARD_WIDTH)}${side}`;
  cardArr[4] = ` ${bot.repeat(CARD_WIDTH)} `;

  return cardArr;
}

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

    // let blankCard = cardImage();
    // let card1 = cardImage(['10', 'diamonds']);
    // let cards = [blankCard, card1];
    // console.log(displaycardImages(cards));
    console.log(dealerHand);

    displayHand(dealerHand, true);
    displayHand(playerHand);

    // stay seems to be broken
    console.log("\nHit or stay?");
    let answer = readline.question('=> ');
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