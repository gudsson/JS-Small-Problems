const SUIT_UTF16 = {
  heart: String.fromCharCode(9825),
  diamonds: String.fromCharCode(9826),
  spades: String.fromCharCode(9828),
  clubs: String.fromCharCode(9831)
};
const CARD_WIDTH = 5;

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
  // display = cards.map
}

let blankCard = cardImage();
let card1 = cardImage(['10', 'diamonds']);
let cards = [blankCard, card1];
console.log(displaycardImages(cards));

// empty
// 9824 solid spade
// 9827 solid club
// 9829 solid heart
// 9830 solid diamond
// 9825 empty heart
// 9826 empty diamond
// 9828 empty spade
// 9831 empty club

// for (let idx = 9800; idx < 9900; idx++) {
//   console.log( idx + ' | ' + String.fromCharCode(idx));
// }

// console.log(String.fromCharCode(9824));