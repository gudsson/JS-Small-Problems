/////////////////////////
// Practice Problem 14 //
/////////////////////////

// Given the following data structure write some code to return an array
// containing the colors of the fruits and the sizes of the vegetables. The
// sizes should be uppercase, and the colors should be capitalized.

let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

// The return value should look like this:
// [["Red", "Green"], "MEDIUM", ["Red", "Green"], ["Orange"], "LARGE"]

// for (let produce in obj) {
//   console.log(produce);
// }

console.log(Object.keys(obj).map(produce => {
  if (obj[produce].type === "fruit") {
    return obj[produce].colors.map(element => {
      return element[0].toUpperCase() + element.slice(1);
    });
  } else {
    return obj[produce].size.toUpperCase();
  }
}));