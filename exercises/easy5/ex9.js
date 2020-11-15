///////////////
// How Many? //
///////////////

// Write a function that counts the number of occurrences of each element in a 
// given array. Once counted, log each element alongside the number of occurrences. 
// Consider the words case sensitive e.g. ("suv" !== "SUV").

// Example:
let vehicles = ['car', 'car', 'truck', 'car', 'SUV', 'truck',
                'motorcycle', 'motorcycle', 'car', 'truck'];

countOccurrences(vehicles);

// console output -- your output sequence may be different
// > car => 4
// > truck => 3
// > SUV => 1
// > motorcycle => 2

function countOccurrences(arr) {
  results = {};

  arr.forEach(element => {
    if (results[element]) {
      results[element] += 1;
    } else {
      results[element] = 1;
    }
  });

  let keys = Object.keys(results);

  keys.forEach(e => {
    console.log(`${e} => ${results[e]}`);
  })
}