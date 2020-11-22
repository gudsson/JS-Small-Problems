////////////////////////
// Practice Problem 7 //
////////////////////////

// What is the return value of map in the following code? Why?

['ant', 'bear'].map(elem => {
  if (elem.length > 3) {
    return elem;
  }
});

// [ undefined, 'bear' ] because there is no return
// case that catches the first element.