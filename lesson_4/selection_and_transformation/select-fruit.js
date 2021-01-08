let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

console.log(selectFruit(produce)); // => { apple: 'Fruit', pear: 'Fruit' }

function selectFruit(obj) {
  let keys = Object.keys(obj);
  let resObj = {};
  for (let idx = 0; idx < keys.length; idx++) {
    if (obj[keys[idx]] === 'Fruit') resObj[keys[idx]] = obj[keys[idx]];
  }
  return resObj;
}