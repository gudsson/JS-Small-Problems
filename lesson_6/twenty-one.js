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
const CARD_SUITS = [
  'hearts',
  'diamonds',
  'spades',
  'clubs'
];
const FACE_CARDS = {
  J: 'Jack',
  Q: 'Queen',
  K: 'King',
  A: 'Ace',
};
const PLAY_AGAIN_RESPONSES = ['yes', 'no'];
const POSSIBLE_MOVES = ['hit', 'stay'];
const SUIT_UTF = {
  hearts: String.fromCharCode(9829),
  diamonds: String.fromCharCode(9830),
  spades: String.fromCharCode(9824),
  clubs: String.fromCharCode(9827)
};
const CARD_WIDTH = 5;
const MIN_MATCH_LENGTH = 1;
const MAX_MATCH_LENGTH = 100;
const PAUSE_LENGTH = 1000;

let score = initializeMatchup();

function printTitle(title, intro = false) {
  let titleIntro = (intro) ? 'WELCOME TO ' : '';
  let titleStr = `   ${titleIntro}${title.toUpperCase()}!   `;

  console.clear();
  console.log(`+${'-'.repeat(titleStr.length)}+`);
  console.log(`|${titleStr}|`);
  console.log(`+${'-'.repeat(titleStr.length)}+`);
  console.log('');

  return null;
}

function initializeMatchup() {
  console.clear();
  printTitle(GAME_TITLE, true);
  console.log("MATCH SETUP");
  console.log("===========\n");

  let matchLength = Number(getMatchLength());
  let initialScore = initializeScore(matchLength);
  return initialScore;
}

function getMatchLength() { // get match length from user (best-of-n)
  let matchLength = 1;
  let invalidMsg = "Sorry, that's not a valid choice.  Pick a number between " +
    ` ${MIN_MATCH_LENGTH} and ${MAX_MATCH_LENGTH} and press <enter>:`;

  console.log(`Match Length: How many games must you win to take the match?`);
  while (true) {
    matchLength = Number(readline.question(`=> First to `).replace(/[^\d]/g, ''));

    // verify match length
    if (matchLength >= MIN_MATCH_LENGTH
      && matchLength <= MAX_MATCH_LENGTH) {
      break;
    } else {
      console.log(invalidMsg);
    }
  }

  return matchLength;
}

function initializeScore(matchLength) {
  let score = {
    [CPU_PLAYER]: 0,
    [HUMAN_PLAYER]: 0,
    ties: 0,
    winsNeeded: matchLength
  };

  return score;
}

function displayScore(printScore = true) {
  if (printScore) {
    let title = `Current Score`;
    let colonPos = title.length + Math.max(...PLAYERS.map(name => {
      return name.length;
    })) + 2;
    let pad = [
      ' '.repeat(colonPos - CPU_PLAYER.length - title.length),
      ' '.repeat(colonPos - HUMAN_PLAYER.length - title.length),
      ' '.repeat(colonPos - 'Ties'.length)
    ];

    // Scoreboard Line 1
    console.log(`${title}${pad[0]}${scoreline(CPU_PLAYER)}`);

    // Scoreboard Line 2
    console.log(`${'='.repeat(title.length)}${pad[1]}${scoreline(HUMAN_PLAYER)}`);

    // Scoreboard Line 3
    console.log((score.ties > 0) ? `${pad[2]}${scoreline('ties')}\n` : '');
  }
  return null;
}

function scoreline(resultLookup) {
  let resultType = (resultLookup === 'ties') ? 'tie' : 'win';
  let winMarker = (resultLookup !== 'ties' && score[resultLookup] === score.winsNeeded)
    ? '  <== WINNER' : '';
  let text = `${capitalize(resultLookup)}:   `
  + `${score[resultLookup]} ${pluralize(resultType, score[resultLookup])}${winMarker}`;
  return text;
}

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
  return deck.shift();
}

function dealCards(deck, numCards = 1) {
  let cards = [];

  for (let idx = 0; idx < numCards; idx += 1) {
    cards.push(dealCard(deck));
  }

  return cards;
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

function hit(hand, deck) {
  hand.push(dealCard(deck));
  return hand;
}

function busted(handValue) {
  return handValue > BUST_NUMBER;
}

function totalHandValue(hand) {
  let aceCount = hand.filter(card => card[0] === 'A').length;

  // Do math
  let cardValues = hand.map(card => getCardValue(card[0]));
  let total = cardValues.reduce((total, val) => total + val, 0);

  // Correct for Aces
  while (aceCount > 0 && total > BUST_NUMBER) {
    total -= 10;
    aceCount -= 1;
  }

  return total;
}

function displayHands(cards, cardValues, obscure = false) {
  let players = Object.keys(cards);

  // loop over player hands
  players.forEach(player => {
    let hand = cards[player].slice();
    let total = cardValues[player];
    let totalIntro = 'Total of';

    // hide holeCard
    if (obscure && player === CPU_PLAYER) {
      let holeCard = hand[hand.length - 1];
      total -= getCardValue(holeCard[0]);
      totalIntro = `Showing`;
      hand[hand.length - 1] = 'an unknown card';
    }

    // get and display card images
    let cardImages = hand.map(card => cardImage(card));
    displaycardImages(cardImages);

    // Display text summary of hand
    console.log(`${capitalize(player)} has: ${describeCards(hand)} (${totalIntro} ${total}).\n\n`);
  });
}

function describeCards(hand) {
  // (ie ['K', 'hearts'] to 'King of Hearts'
  let cardNames = hand.map(card => {
    return (FACE_CARDS[card[0]]) ? [FACE_CARDS[card[0]], card[1]] : card;
  }).map(card => {
    // capitalize words in card names
    return Array.isArray(card) ? card.map(part => capitalize(part)).join(' of ') : card;
  });

  return joinOr(cardNames,", ","and");
}

function getCardValue(cardRank) {
  switch (true) {
    case cardRank === "A":
      return 11;
    case ['J', 'Q', 'K'].includes(cardRank):
      return 10;
    default:
      return Number(cardRank);
  }
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

function pluralize(result, scoreCount) {
  if (scoreCount !== 1) return result + 's';
  else return result;
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function playerResponse() {
  while (true) {
    console.log(`${capitalize(HUMAN_PLAYER)}: Do you want to hit (h) or stay (s)?`);
    let answer = readline.question('=> ').replace(/[^a-z]/,'').toLowerCase();

    // check if answer contains hit, stay or starts with h or s (after cleaning)
    let verifiedAnswer = POSSIBLE_MOVES.map(response => {
      return response.includes(answer) || answer.includes(response);
    }).some(_ => true);

    // check verified and not simultaneously hit and stay.
    if (verifiedAnswer && !(answer.includes('h') && (answer.includes('s')))) {
      if (answer[0] === 's') {
        console.log(`\n${capitalize(HUMAN_PLAYER)} stays.\n`);
        return 'stay';
      } else if (answer[0] === 'h') {
        console.log(`\n${capitalize(HUMAN_PLAYER)} hits.\n`);
        return 'hit';
      }
    }
    console.log('\nAmbiguous response. Please type (h) or (s) and press <enter>:\n');
  }
}

function pause(milliseconds) {
  let startTime = new Date().getTime();
  for (let idx = 0; idx < Number.MAX_SAFE_INTEGER; idx++) {
    if (milliseconds < (new Date().getTime() - startTime)) {
      break;
    }
  }
}

function printBoard(hands, handValues, obscureDealer = false) {
  console.clear();
  printTitle(`${GAME_TITLE} | FIRST TO ${score.winsNeeded} WINS`);
  displayScore();
  displayHands(hands, handValues, obscureDealer);
}

function someoneWonMatch() {
  return [score[CPU_PLAYER], score[HUMAN_PLAYER]].includes(score.winsNeeded);
}

function getMatchWinner() {
  if (score[HUMAN_PLAYER] === score.winsNeeded) {
    return HUMAN_PLAYER;
  } else if (score[CPU_PLAYER] === score.winsNeeded) {
    return CPU_PLAYER;
  }
  return null;
}

function printCountdown(count, move) {
  console.log(`...Dealer's turn...\n`);
  pause(PAUSE_LENGTH);
  for (let idx = count; idx >= 1; idx--) {
    process.stdout.write(String(idx) + '...');
    pause(PAUSE_LENGTH);
  }
  process.stdout.write(`Dealer ${capitalize(move)}s.\n`);
  pause(PAUSE_LENGTH);
  return null;
}

function playerTurn(hands, handValues, deck) {
  let hand = hands[HUMAN_PLAYER];

  while (true) {
    printBoard(hands, handValues, true);

    let answer = playerResponse();

    if (answer === 'stay') {
      return false;
    } else { // else hit player and check for bust
      handValues[HUMAN_PLAYER] = totalHandValue(hit(hand, deck));

      if (busted(handValues[HUMAN_PLAYER])) {
        return true;
      }
    }
  }
}

function dealerTurn(hands, handValues, deck) {
  let hand = hands[CPU_PLAYER];

  while (totalHandValue(hand) < DEALER_HITS_UNTIL) {
    printBoard(hands, handValues);
    printCountdown(3, 'hit');

    // hit dealer and check if busted
    handValues[CPU_PLAYER] = totalHandValue(hit(hand, deck));
    if (busted(handValues[CPU_PLAYER])) return null;
  }

  // if dealer stays
  printBoard(hands, handValues);
  printCountdown(3, 'stay');

  return null;
}

function getGameWinner(handValues) {
  let playerScore = handValues[HUMAN_PLAYER];
  let dealerScore = handValues[CPU_PLAYER];

  if (playerScore === dealerScore) return null;

  if (busted(playerScore)) {
    return CPU_PLAYER;
  } else if (busted(dealerScore)) {
    return HUMAN_PLAYER;
  } else {
    return (playerScore > dealerScore) ? HUMAN_PLAYER : CPU_PLAYER;
  }
}

function updateScore(winner) {
  if (!winner) {
    score.ties += 1;
  } else {
    score[winner] += 1;
  }
  return null;
}

function displayGameResult(winner, handValues) {
  let textArr = [];

  if (winner) {
    let loser = (winner === HUMAN_PLAYER) ? CPU_PLAYER : HUMAN_PLAYER;
    let [winnerScore, loserScore] = [handValues[winner], handValues[loser]];

    textArr.push(winner === HUMAN_PLAYER ? 'YOU WIN!' : 'YOU LOSE!');

    if (loserScore > BUST_NUMBER) {
      textArr.push(`\n${capitalize(loser)} BUSTS by exceeding `
        + `${BUST_NUMBER} with a score of ${loserScore}.`);
      textArr.push(`\n${capitalize(winner)} wins with a score of ${winnerScore}.`);
    } else {
      textArr.push(`\n${capitalize(winner)} wins by a score of `
        + `${winnerScore} to ${loserScore}!`);
    }
  } else {
    textArr.push(`Push! Game ends in a draw (Total of ${handValues[CPU_PLAYER]} a piece).`);
  }

  printArrayWithBoarders(textArr);
  return null;
}

function printArrayWithBoarders(textArr) {
  let maxLength = textArr.slice().sort((a, b) => {
    return (b.length - a.length);
  })[0].length;

  let border = '='.repeat(maxLength);

  textArr = [...[border], ...textArr, ...[border]];
  textArr.forEach(line => console.log(line));

  return null;
}

function displayMatchResult(winner) {
  let exclamation = (winner === HUMAN_PLAYER) ? 'CONGRATULATIONS' : 'SORRY';
  let loser = (winner === HUMAN_PLAYER) ? CPU_PLAYER : HUMAN_PLAYER;

  console.log(`\n***${exclamation}***`);
  console.log(`\n${capitalize(winner)} is first to ${score.winsNeeded} and wins the match `
    + `${score[winner]} ${pluralize('game', score[winner])} to ${score[loser]}.`);
}

function playAgain(matchWinner = null) {
  let msg =
    (matchWinner) ? '\nStart a new match?' : '\nContinue to next game?';

  while (true) {
    console.log(`${msg} (y or n)`);
    let answer = readline.question(`=> `).toLowerCase();

    // check if answer contains y, n, yes or no (after cleaning)
    let verifiedAnswer = PLAY_AGAIN_RESPONSES.map(response => {
      return response.includes(answer) || answer.includes(response);
    }).some(_ => true);

    // check if verified and not simultaneously yes and no.
    if (verifiedAnswer
      && !(answer.includes('y') && (answer.includes('n')))) {
      if (answer[0] === 'n') return false;
      if (answer[0] === 'y') return true;
    }

    console.log('\nAmbiguous response. Re-enter choice:');
  }
}

// Start Individual Game
while (true) {
  let deck = initializeDeck();
  let hands = {
    [CPU_PLAYER]: dealCards(deck, 2),
    [HUMAN_PLAYER]: dealCards(deck, 2)
  };
  let handValues = {
    [CPU_PLAYER]: totalHandValue(hands[CPU_PLAYER]),
    [HUMAN_PLAYER]: totalHandValue(hands[HUMAN_PLAYER])
  };

  // playerTurn returns true if player busts.
  let playerBusts = playerTurn(hands, handValues, deck);

  // if player doesn't bust, execute dealer's turn(s).
  if (!playerBusts) {
    dealerTurn(hands, handValues, deck);
  }

  // once dealer is done, refresh gameboard and display result
  let result = getGameWinner(handValues);
  updateScore(result);
  printBoard(hands, handValues);
  displayGameResult(result, handValues);

  // check if current match is over
  if (someoneWonMatch()) {
    let matchWinner = getMatchWinner();
    displayMatchResult(matchWinner);

    if (playAgain(matchWinner)) {
      score = initializeMatchup();
    } else break;
  } else if (!playAgain()) break;
}

console.log(`\nThanks for playing ${GAME_TITLE}!\n`);