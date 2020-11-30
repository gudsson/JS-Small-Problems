/* eslint-disable max-lines-per-function */
//////////////////////////////////
// Stack Machine Interpretation //
//////////////////////////////////

// A stack is a list of values that grows and shrinks dynamically.
// A stack may be implemented as an Array that uses two Array
// methods: Array.prototype.push and Array.prototype.pop.

// A stack-and-register programming language is a language that
// uses a stack of values. Each operation in the language operates
// on a register, which can be thought of as the current value. The
// register is not part of the stack. An operation that requires two
// values pops the topmost item from the stack (i.e., the operation
// removes the most recently pushed value from the stack), operates
// on the popped value and the register value, and stores the result
// back in the register.

// This sounds complex, but the behavior is straightforward and easy
// to walk through manually. Consider a MULT operation in a
// stack-and-register language. It multiplies the stack value with
// the register value, removes the value from the stack, and stores
// the result back in the register. For example, if we start with a
// stack of [3, 6, 4] (where 4 is the topmost item in the stack) and
// a register value of 7, the MULT operation transforms the stack to
// [3, 6] (the 4 is removed), and the result of the multiplication,
// 28, is left in the register. If we do another MULT at this point,
// the stack is transformed to [3], and the register is left with the
// value 168.

// Write a function that implements a miniature stack-and-register-based
// programming language that has the following commands (also called
//   operations or tokens):

// All operations are integer operations (which is only important
//   with DIV and MOD).

// Programs will be supplied to your language function via a string
// argument. Your function may assume that all arguments are valid
// programs — i.e., they will not do anything like trying to pop a
// non-existent value from the stack, and they won't contain any
// unknown tokens.

// Initialize the stack and register to the values [] and 0,
// respectively.

const ALL_TOKENS = ['n', 'PUSH', 'ADD', 'SUB', 'MULT', 'DIV', 'MOD', 'POP', 'PRINT'];

let stack = [];
let reg = 0;

function print() {
  // PRINT : Print the register value.
  console.log(reg);
  return null;
}

function push() {
  // PUSH : Push the register value onto the stack. Leave the value in the
  // register.
  stack.push(parseInt(reg, 10));
  return null;
}

function mult() {
  // MULT : Pop a value from the stack and multiply it by the register
  // value, storing the result in the register.
  reg *= stack.pop();
  return null;
}

function add() {
  // ADD : Pop a value from the stack and add it to the register value,
  // storing the result in the register.
  reg += stack.pop();
  return null;
}

function pop() {
  // POP : Remove the topmost item from the stack and place it in the register.
  reg = stack.pop();
  return null;
}

function sub() {
  // SUB : Pop a value from the stack and subtract it from the register
  // value, storing the result in the register.
  reg -= stack.pop();
  return null;
}

function mod() {
  // MOD : Pop a value from the stack and divide it into the register
  // value, storing the integer remainder of the division in the register.
  reg %= stack.pop();
  return null;
}

function div() {
  // DIV : Pop a value from the stack and divide it into the register
  // value, storing the integer result in the register.
  reg = parseInt((reg / stack.pop()), 10);
  return null;
}

function callCommand(command) {
  switch (command) {
    case 'PRINT':
      print();
      break;
    case 'PUSH':
      push();
      break;
    case 'MULT':
      mult();
      break;
    case 'ADD':
      add();
      break;
    case 'POP':
      pop();
      break;
    case 'SUB':
      sub();
      break;
    case 'MOD':
      mod();
      break;
    case 'DIV':
      div();
      break;
  }
}

function minilang(str) {
  let commandArr = str.split(' ');

  commandArr.forEach(val => {
    if (ALL_TOKENS.includes(val)) {
      callCommand(val);
    } else {
      // n : Place a value, n, in the register. Do not modify the stack.
      reg = parseInt(val, 10);
    }
  });
}

minilang('PRINT');
// 0

minilang('5 PUSH 3 MULT PRINT');
// 15

minilang('5 PRINT PUSH 3 PRINT ADD PRINT');
// 5
// 3
// 8

minilang('5 PUSH POP PRINT');
// 5

minilang('3 PUSH 4 PUSH 5 PUSH PRINT ADD PRINT POP PRINT ADD PRINT');
// 5
// 10
// 4
// 7

minilang('3 PUSH PUSH 7 DIV MULT PRINT');
// 6

minilang('4 PUSH PUSH 7 MOD MULT PRINT');
// 12

minilang('-3 PUSH 5 SUB PRINT');
// 8

minilang('6 PUSH');
// (nothing is printed because the `program` argument has no `PRINT` commands)