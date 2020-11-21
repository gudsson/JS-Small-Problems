////////////////////////////
// Palindromic Substrings //
////////////////////////////

// Write a function that returns a list of all palindromic substrings of a
// string. That is, each substring must consist of a sequence of characters
// that reads the same forward and backward. The substrings in the returned
// list should be sorted by their order of appearance in the input string.
// Duplicate substrings should be included multiple times.

// You may (and should) use the substrings function you wrote in the previous
// exercise.

// For the purpose of this exercise, you should consider all characters and
// pay attention to case; that is, 'AbcbA' is a palindrome, but 'Abcba' and
// 'Abc-bA' are not. In addition, assume that single characters are not
// palindromes.

// Examples:
palindromes('abcd');       // []
palindromes('madam');      // [ "madam", "ada" ]

palindromes('hello-madam-did-madam-goodbye');
// returns
// [ "ll", "-madam-", "-madam-did-madam-", "madam", "madam-did-madam", "ada",
//   "adam-did-mada", "dam-did-mad", "am-did-ma", "m-did-m", "-did-", "did",
//   "-madam-", "madam", "ada", "oo" ]

palindromes('knitting cassettes');
// returns
// [ "nittin", "itti", "tt", "ss", "settes", "ette", "tt" ]

function substrings(str) {
  let substringArr = [];

  for (let idx1 = 0; idx1 < str.length; idx1 += 1) {
    for (let idx2 = idx1 + 1; idx2 <= str.length; idx2 += 1) {
      substringArr.push(str.slice(idx1, idx2));
    }
  }

  return substringArr;
}

function palindromes(str) {
  let substringArr = substrings(str);
  let palindromeArr = [];

  substringArr.forEach(element => {
    if ( element.length > 1 && element === element.split('').reverse().join('')) {
      palindromeArr.push(element);
    }
  });

  return palindromeArr;
}

// Solution
// function isPalindrome(word) {
//   return word.length > 1 && word === word.split("").reverse().join("");
// }

// function palindromes(string) {
//   return substrings(string).filter(isPalindrome);
// }

// Discussion
// Again, this problem becomes much easier to solve with the help of the
// substrings function from the previous exercise. The solution uses the
// substrings function to get a list of all the substrings, and then just
// uses the isPalindrome function to filter out any substrings that aren't
// palindromes.

// This series of exercises is a good example of how to break down a problem
// into manageable chunks. Go over these three exercises again, with that
// perspective in mind.