//////////////////////////////
// Get The Middle Character //
//////////////////////////////

// Write a function that takes a non-empty string argument, and returns the middle character(s) of 
// the string. If the string has an odd length, you should return exactly one character. If the string 
// has an even length, you should return exactly two characters.

// Examples:
centerOf('I Love JavaScript'); // "a"
centerOf('Launch School');     // " "
centerOf('Launch');            // "un"
centerOf('Launchschool');      // "hs"
centerOf('x');                 // "x"

function centerOf(str) {
  return console.log(str.slice(Math.ceil(str.length / 2 - 1), Math.ceil(str.length / 2) + ((str.length % 2) ? 0 : 1)));
}

// Solution
// function centerOf(string) {
//   if (string.length % 2 === 1) {
//     let centerIndex = (string.length - 1) / 2;
//     return string[centerIndex];
//   } else {
//     let leftIndex = string.length / 2 - 1;
//     return string.substring(leftIndex, leftIndex + 2);
//   }
// }

// Discussion
// This is mildly tricky, but not terribly so. The main difficulty here is understanding the indexes you're working with. When faced with a complex indexing problem, it's sometimes easiest to walk through one or two examples so you can wrap your brain around what you need to do.

// Let's start by looking at a string with an odd length. We'll use Turbo as our example - it has a length of 5:

// string	T	u	r	b	o
// index	0	1	2	3	4
// center			*		
// It's easy enough to see that the middle character, r, is at index position 2 of this string. If we were to repeat this same procedure with a string of length 7, the index would be 3. Likewise, the middle character of a string of length 3 is at index 1. There's a pattern here:

// length	center index
// 5	(5 - 1) / 2 => 2
// 7	(7 - 1) / 2 => 3
// 3	(3 - 1) / 2 => 1
// We can generalize this pattern: if n is an odd number and you have an string of length n, then the middle character is at index (n - 1) / 2. To get the middle character, we just have to retrieve the character at that index, e.g., string[2] for a 5 character string.

// Things are just a little more complicated for even-length strings, but we can use the same approach: look at a few test examples. We'll use Subway as our example - it has a length of 6:

// string	S	u	b	w	a	y
// index	0	1	2	3	4	5
// center			*	*		
// It's easy enough to see that the middle characters, b and w, are at index positions 2 and 3 of this string. If we were to repeat this same procedure with a string of length 8, the indexes would be 3 and 4. Likewise, the middle characters of a string of length 4 are at indexes 1 and 2. Again, there's a pattern:

// length	right index	left index
// 6	6 / 2 => 3	3 - 1 => 2
// 8	8 / 2 => 4	4 - 1 => 3
// 4	4 / 2 => 2	2 - 1 => 1
// Given the left index we've calculated, we can now use the substring method to extract the two characters starting at the left index as the middle characters. For our 6 character example, string.substring(leftIndex, leftIndex + 2)