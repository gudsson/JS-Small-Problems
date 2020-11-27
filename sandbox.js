function evenValues(array) {
  let evens = [];

  array.forEach(value => {
    if (value % 2 === 0) {
      evens.push(value);
    }
    array.shift();
  });

  return evens;
}

console.log(evenValues([1, 3, 4, 2, 4, 6, 5, 7, 9, 10, 12]));