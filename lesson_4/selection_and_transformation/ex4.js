let myNumbers = [1, 4, 3, 7, 2, 6];
multiplyElements(myNumbers, 3);  // => [2, 4, 6, 14, 2, 6]

function multiplyElements(numbers, multiplier) {
  let multipliedNums = [];

  for (let counter = 0; counter < numbers.length; counter += 1) {
    let currentNumber = numbers[counter];

    multipliedNums.push(currentNumber * multiplier);
  }

  return console.log(multipliedNums);
}