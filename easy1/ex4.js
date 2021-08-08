const readline = require('readline-sync');

console.log("Enter the length of the room in metres:")
let length = parseInt(readline.prompt(), 10);

console.log("Enter the width of the room in metres:")
let width = parseInt(readline.prompt(), 10);

let area = calcArea(length, width);

console.log(`The area of the room is ${area['metric']} square metres (${area['imperial']} square feet).`);

function calcArea(l, w) {
  let metricArea = (l * w).toFixed(2);
  let imperialArea = (metricArea * 10.7639).toFixed(2);
  return {
    'metric': metricArea, 
    'imperial': imperialArea
  };
}
