////////////////////////
// Lettercase Counter //
////////////////////////

// Write a function that takes a string and returns an object containing
// three properties: one representing the number of characters in the
// string that are lowercase letters, one representing the number of
// characters that are uppercase letters, and one representing the
// number of characters that are neither.

// Examples:
letterCaseCount('abCdef 123');  // { lowercase: 5, uppercase: 1, neither: 4 }
letterCaseCount('AbCd +Ef');    // { lowercase: 3, uppercase: 3, neither: 2 }
letterCaseCount('123');         // { lowercase: 0, uppercase: 0, neither: 3 }
letterCaseCount('');            // { lowercase: 0, uppercase: 0, neither: 0 }

function letterCaseCount(str) {
  let resultObj = { lowercase: 0, uppercase: 0, neither: 0,
  };

  str.split('').forEach(element => {
    if (element.toUpperCase() === element.toLowerCase()) {
      resultObj.neither += 1;
    } else if (element === element.toUpperCase()) {
      resultObj.uppercase += 1;
    } else {
      resultObj.lowercase += 1;
    }
  });

  return console.log(resultObj);
}

// Solution
// Solution 1
// function letterCaseCount(string) {
//   let counts = { lowercase: 0, uppercase: 0, neither: 0 }

//   for (let index = 0; index < string.length; index += 1) {
//     let char = string[index];
//     if ((char >= 'a') && (char <= 'z')) {
//       counts.lowercase += 1;
//     } else if ((char >= 'A') && (char <= 'Z')) {
//       counts.uppercase += 1;
//     } else {
//       counts.neither += 1;
//     }
//   }

//   return counts;
// }

// Solution 2
// function letterCaseCount(string) {
//   let lowercaseChars = string.match(/[a-z]/g) || [];
//   let uppercaseChars = string.match(/[A-Z]/g) || [];
//   let neitherChars = string.match(/[^a-z]/gi) || [];

//   return {
//     lowercase: lowercaseChars.length,
//     uppercase: uppercaseChars.length,
//     neither: neitherChars.length
//   };
// }

// Discussion
// This method is expected to return a hash of character counts.

// In the first solution, we simply iterate through the string counting
// the different types of character by using some simple logical expressions.

// The second solution uses the String.prototype.match method to process
// the string argument. The method takes a regular expression pattern as
// an argument and returns an array of characters that match the pattern.
// The solution first gets an array of matches for each character type
// and assigns each array to its respective variable. If the solution
// does not find any matches, it sets the variable to an empty array ([])
// so that an error will not be raised when the length property is accessed
// on the variable later. Finally, the solution returns an object with
// three properties, setting the value of each to the length of the
// corresponding array (i.e., the lowercase property has a value of
//   lowerArray.length).

// In the second solution, we use regular expressions to count each of
// the three types of characters. If you are not familiar with regular
// expression, here's a brief explanation of the patterns we use:

// /[a-z]/g : Checks whether the character is a lowercase letter
// between 'a' and 'z'.
// /[A-Z]/g : Checks whether the character is an uppercase letter
// between 'A' and 'Z'.
// /[^a-z]/gi : Checks whether the character is neither an uppercase
// nor a lowercase letter.
// g : Tells the regex engine to search the entire string.
// i : Tells the regex engine to ignore case.