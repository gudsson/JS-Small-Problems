//////////////////////////
// Search Word (Part 1) //
//////////////////////////

// Write a function that takes a word and a string of text as parameters,
// and returns an integer representing the number of times the word appears
// in the text.

// You may assume that the word and text inputs will always be provided,
// and that all word breaks are spaces. Thus, some words will include
// punctuation such as periods and commas.

// Example:
const text = 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Sed quis autem vel est, iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?';

searchWord('sed', text);     // 4
searchWord('est', text);     // 0
searchWord('est,', text);    // 2

function searchWord(word, string) {
  let count = 0;

  string.split(' ').forEach(element => {
    if (word.toLowerCase() === element.toLowerCase()) count += 1;
  });

  return count;
}

// Solution
// function searchWord(word, text) {
//   let ucWord = word.toUpperCase();
//   let ucWordsInText = text.toUpperCase().split(' ');
//   let count = 0;

//   for (let index = 0; index < ucWordsInText.length; index += 1) {
//     if (ucWordsInText[index] === ucWord) {
//       count += 1;
//     }
//   }

//   return count;
// }

// Discussion
// The easiest way to handle this problem is to begin by converting both
// input strings to uppercase -- that way, we don't have to worry about
// checking the case of the various strings.

// Our solution also converts the text argument to an array of words,
// including any punctuation characters. We then use a for loop to
// iterate through the array and count matching words.