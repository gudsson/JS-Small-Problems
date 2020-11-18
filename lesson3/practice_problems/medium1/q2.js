// Question 2

// Starting with the string:
let munstersDescription = "The Munsters are creepy and spooky.";

// Return a new string that swaps the case of all of the letters:
// =>`tHE mUNSTERS ARE CREEPY AND SPOOKY.`

munstersDescription = munstersDescription.split("").map(element => {
  if (element === element.toLowerCase()) {
    return element.toUpperCase();
  } else {
    return element.toLowerCase();
  }
}).join("");

console.log(munstersDescription);