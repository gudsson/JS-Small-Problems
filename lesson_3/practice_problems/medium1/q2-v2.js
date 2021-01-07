let munstersDescription = "The Munsters are creepy and spooky.";

function swapCase(str) {
  return str.split('').map(val => {
    return (val === val.toUpperCase()) ? val.toLowerCase() : val.toUpperCase();
  }).join('');
}

console.log(swapCase(munstersDescription));