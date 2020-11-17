// Ask the user for the first number.
// Ask the user for the second number.
// Ask the user for an operation to perform.
// Perform the operation on the two numbers.
// Print the result to the terminal.

const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(num) {
  return num.trimStart() === '' || Number.isNaN(Number(num));
}

prompt('Welcome to Calculator!');

prompt("What's the first number?");
let number1 = readline.question();

while (invalidNumber(number1)) {
  prompt(`Hmm... that doesn't look like a valid number.`);
  number1 = readline.question();
}

prompt("What's the second number?");
let number2 = readline.question();

while (invalidNumber(number2)) {
  prompt(`Hmm... that doesn't look like a valid number.`);
  number2 = readline.question();
}

prompt('What operation would you like to perform?');
prompt('1) Add 2) Subtract 3) Multiply 4) Divide');
let operation = readline.question();

while (!['1', '2', '3', '4'].includes(operation)) {
  prompt(`Must choose 1, 2, 3 or 4`);
  operation = readline.question();
}

let output;
switch (operation) {
  case '1':
    output = Number(number1) + Number(number2);
    break;
  case '2':
    output = Number(number1) - Number(number2);
    break;
  case '3':
    output = Number(number1) * Number(number2);
    break;
  case '4':
    output = Number(number1) / Number(number2);
    break;
}

console.log(`The result is: ${output}`);

const readline = require('readline-sync');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

// Solution

// prompt('Welcome to Calculator!');

// while (true) {
//   // ask for two numbers
//   // ask for operation
//   // perform operation and display results

//   prompt('Would you like to perform another operation? (y/n)');
//   let answer = readline.question();

//   if (answer !== 'y') break;
// }
// We nest the main part of our program in a while (true) loop and, at the end of the loop body, we ask the 
// user if they want to perform another calculation. If the user inputs anything other than 'y', we break out 
// of the loop with the break statement. That looks good so far, but suppose the user enters an uppercase 'Y' 
// or the word 'yes' instead of 'y'. What happens then? We can take care of those cases with the following change:

// Copy Code
// while (true) {
//   // code omitted for brevity

//   if (answer[0].toLowerCase() !== 'y') break;
// }
// Extracting messages in the program to a configuration file.

// There are several messages sprinkled throughout the program. Can we move them into some configuration file 
// and access them by key? That would let us manage the messages more easily, and we could even internationalize 
// the messages.
// Use the JSON format to store messages in a file called calculator_messages.json. Here's a quick description 

// of what JSON is.
// Use require('./calculator_messages.json') to load the file into your program as an object.
// Access the messages from that object with object property access syntax.
// First, we need to extract the messages into a configuration file. We can use any format, from plain text 
// files to YAML to CSV. Npm has libraries that can help with parsing those formats, but we're not yet ready 
// to tackle npm libraries. Most JavaScript developers prefer the JSON format, so we'll use that. We'll extract 
// our messages into a file named calculator_messages.json. Make sure this file is in the same directory as your 
// calculator program.

// calculator_messages.jsonCopy Code
// {
//   "welcome": "Welcome to Calculator! Enter your name:",
//   "validName": "Make sure to enter a valid name."
// }
// As you can see, our JSON configuration is just a list of key/value pairs like a JavaScript object. We only 
// show two key-value pairs, but you can add more. Just be sure to follow the syntax shown.

// Next, we'll load this file into our program:

// calculator.jsCopy Code
// // at the top of the file

// const MESSAGES = require('./calculator_messages.json');
// This line will load the contents of the calculator_messages.json file in the form of an object and assign 
// it to the MESSAGES constant. Since it's an ordinary object, we don't have to do anything before we use it. 
// We can just start accessing its properties as needed:

// Copy Code
// // replace this:
// prompt("Welcome to Calculator! Enter your name:");

// // with this:
// prompt(MESSAGES['welcome']);
// Internationalization Your calculator program is a hit, and it's being used all over the world! The problem 
// is, not everyone speaks English. You now need to internationalize the messages in your calculator. You've 
// already done the hard work of extracting all the messages to a configuration file. Now, all you have to do 
// is send that configuration file to translators and call the right translation in your code.
// Modify your JSON file to use nested structures; the outermost structure should use a key to identify the language, 
// while the inner structures should contain the messages that pertain to that language.
// First, we must reorganize our JSON configuration a little bit to account for different languages. We'll nest the 
// message keys under a top-level language, thereby organizing all the values. Here's an example:

// calculator_messages.jsonCopy Code
// {
//   "en": {
//     "welcome": "Welcome to Calculator! Enter your name:",
//     "validName": "Make sure to enter a valid name."
//   },
//   "es": {
//     "welcome": "Bienvenido a la calculadora! Entre su nombre:",
//     "validName": "Asegúrese de entrar un nombre válido."
//   }
// }
// Note that we're using two top-level keys here to distinguish between English messages and Spanish messages. 
// We could have as many top-level keys as we want to -- one for each language our program supports.

// Next, we have to study how this change affects our MESSAGES object. If we do a console.log(MESSAGES) in our 
// program, we'll see that it's still an object, except it's now a nested one. That means we must use a language 
// key first, then the message. For example, we can get the Spanish welcome message like this:

// Copy Code
// MESSAGES['es']['welcome'];
// Because we'll need the language key every time we reference the message, let's move that to a function that we 
// can call. That way, we can pass in the language to the method, which can then reference the MESSAGES object.

// Copy Code
// function messages(message, lang='en') {
//   return MESSAGES[lang][message];
// }
// This now means we can do this in our program:

// Copy Code
// // english
// prompt(messages('welcome'));       // => Welcome to Calculator! Enter your name:

// // english
// prompt(messages('welcome', 'en')); // => Welcome to Calculator! Enter your name:

// // spanish
// prompt(messages('welcome', 'es')); // => Bienvenido a la calculadora! Entre su nombre:
// The last piece is setting a default language for your program.

// Copy Code
// // top of calculator.js

// const LANGUAGE = 'en';
// Finally, whenever you call the prompt, you can do this:

// Copy Code
// prompt(messages('welcome', LANGUAGE));
// If you think that's too verbose, you could move the code around a bit and modify the prompt method:

// Copy Code
// function prompt(key) {
//   let message = messages(key, LANGUAGE);
//   console.log(`=> ${message}`);
// }

// // now you can just do:
// prompt('welcome')
// Now, when non-English users want to use your calculator, all they have to do is change the LANGUAGE setting, 
// provided you have translated the messages for them already.