/////////////////////////
// Reverse It (Part 2) //
/////////////////////////

// Write a function that takes a string argument containing one or more words, and returns a new 
// string containing the words from the string argument. All five-or-more letter words should have 
// their letters in reverse order. The string argument will consist of only letters and spaces. 
// Words will be separated by a single space.

// Examples:
console.log(reverseWords('Professional'));             // "lanoisseforP"
console.log(reverseWords('Walk around the block'));    // "Walk dnuora the kcolb"
console.log(reverseWords('Launch School'));            // "hcnuaL loohcS"

function reverseWords(str) {
  return str.split(' ').map(e => {
    if (e.length > 4) {
      return e.split('').reverse().join('');
    } else {
      return e;
    }
  }).join(' ');
}

// Solution
// function reverseWords(string) {
//   let words = string.split(' ');
//   let reversedWords = [];

//   for (let idx = 0; idx < words.length; idx += 1) {
//     let currentWord = words[idx];
//     if (currentWord.length >= 5) {
//       reversedWords.push(reverseWord(currentWord));
//     } else {
//       reversedWords.push(currentWord);
//     }
//   }

//   return reversedWords.join(' ');
// }

// function reverseWord(word) {
//   return word.split('').reverse().join('');
// }
// Discussion
// This version of the "Reverse It" exercise is a little bit more complicated. The solution still splits the 
// string argument into an array of words, but instead of reversing the order of words within the string, the 
// solution reverses the order of letters within words containing five-or-more letters.

// During each iteration of the for loop, the solution checks if the length of the currentWord is greater than 
// or equal to 5; if it is, the solution reverses the letters of the currentWord using a similar approach as 
// the previous "Reverse It" exercise, but with a different separator argument. The solution then pushes the 
// reversed word to the reversedWords array. If the currentWord is less than 5 letters, the solution pushes the 
// currentWord to the array as-is.

// After the loop finishes, the solution joins the reversedWords array with a space (" ") as a separator, and 
// returns the resulting string.

// Further Exploration
// Did you solve this problem in different way? Try to solve it using map() method.

