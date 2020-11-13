////////////////
// Bannerizer //
////////////////

// Write a function that will take a short line of text, and write it to the console log within a box.

logInBox('To boldly go where no one has gone before.');
logInBox('');

function logInBox(input) {
  let len = input.length + 2;
  let hborder = `+${('-').repeat(len)}+`;
  let padding = `|${(' ').repeat(len)}|\n`;
  let text = `| ${input} |\n`;
  let output = `${hborder}\n${padding}${text}${padding}${hborder}`;

  return console.log(output);
}