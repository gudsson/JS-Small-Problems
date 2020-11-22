let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

console.log(selectFruit(produce)); // => { apple: 'Fruit', pear: 'Fruit' }

function selectFruit(list) {
  let returnObj = {};
  let keys = Object.keys(list);
  
  keys.forEach(element => {
    if (list[element] === 'Fruit') {
      returnObj[element] = list[element];
    }
  })

  return returnObj;
}

// Solution
// function selectFruit(produceList) {
//   let produceKeys = Object.keys(produceList);
//   let selectedFruits = {};

//   for (let counter = 0; counter < produceKeys.length; counter++) {
//     let currentKey = produceKeys[counter];
//     let currentValue = produceList[currentKey];

//     if (currentValue === 'Fruit') {
//       selectedFruits[currentKey] = currentValue;
//     }
//   }

//   return selectedFruits;
// }