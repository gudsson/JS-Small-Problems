let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Pebbles", "Bambam"];

let obj = {};

flintstones.forEach((val, idx) => obj[val] = idx);

console.log(obj);