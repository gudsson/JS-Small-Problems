/////////////////////////////
// Staggered Caps (Part 2) //
/////////////////////////////

// Modify the function from the previous exercise so it ignores non-alphabetic
// characters when determining whether it should uppercase or lowercase each
// letter. The non-alphabetic characters should still be included in the return
// value; they just don't count when toggling the desired case.

// Example:
console.log(staggeredCase("I Love Launch School!") === "I lOvE lAuNcH sChOoL!");
console.log(staggeredCase("ALL CAPS") === "AlL cApS");
console.log(
  staggeredCase("ignore 77 the 444 numbers") === "IgNoRe 77 ThE 444 nUmBeRs"
);

function staggeredCase(str) {
  return str.split('').map((element, idx) => {
    if (element.match(/[a-z]/gi)) {
      if (idx % 2) {
        return element.toLowerCase();
      } else {
        return element.toUpperCase();
      }
    } else {
      return element;
    }
  }).join('');
}