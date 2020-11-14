/////////////////////////////
// Letter Counter (Part 2) //
/////////////////////////////

// Modify the wordSizes function from the previous exercise to exclude non-letters when determining word size. For instance, the word size of "it's" is 3, not 4.

// Examples:
wordSizes('Four score and seven.');                       // { "3": 1, "4": 1, "5": 2 }
wordSizes('Hey diddle diddle, the cat and the fiddle!');  // { "3": 5, "6": 3 }
wordSizes("What's up doc?");                              // { "2": 1, "3": 1, "5": 1 }
wordSizes('');                                            // {}

function wordSizes(str) {
  let wordArr = str.split(' ');
  let sizesObj = {};

  wordArr.forEach(element => {
    if (element.length) {
      let cleanedWord = element.replace(/[^a-z]/gi,'');
      (sizesObj[cleanedWord.length]) ? sizesObj[cleanedWord.length]++ : sizesObj[cleanedWord.length] = 1;
    }
  })
  return console.log(sizesObj);
}