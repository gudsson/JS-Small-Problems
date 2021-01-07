let munstersDescription = "the Munsters are CREEPY and Spooky.";
// => The munsters are creepy and spooky.

function properCap(str) {
  let strArr = str.toLowerCase().split('');

  return strArr.shift().toUpperCase() + strArr.join('');
}

console.log(properCap(munstersDescription));