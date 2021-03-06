/////////////////////////////////
// Inventory Item Transactions //
/////////////////////////////////

// Write a function that takes two arguments, inventoryItem and transactions,
// and returns an array containing only the transactions for the specified
// inventoryItem.

// Example
let transactions = [
  { id: 101, movement: 'in',  quantity:  5 },
  { id: 105, movement: 'in',  quantity: 10 },
  { id: 102, movement: 'out', quantity: 17 },
  { id: 101, movement: 'in',  quantity: 12 },
  { id: 103, movement: 'out', quantity: 20 },
  { id: 102, movement: 'out', quantity: 15 },
  { id: 105, movement: 'in',  quantity: 25 },
  { id: 101, movement: 'out', quantity: 18 },
  { id: 102, movement: 'in',  quantity: 22 },
  { id: 103, movement: 'out', quantity: 15 }, ];

transactionsFor(101, transactions);
// returns
// [ { id: 101, movement: "in",  quantity:  5 },
//   { id: 101, movement: "in",  quantity: 12 },
//   { id: 101, movement: "out", quantity: 18 }, ]

function transactionsFor(itemId, transactions) {
  return transactions.filter(element => element.id === itemId);
}

// Solution
// function transactionsFor(inventoryItem, transactions) {
//   return transactions.filter(inventory => inventory.id === inventoryItem);
// }
// Discussion
// The shape of this problem is that of filtering. Given a list of inventory
// transactions, the solution selects only those that belong to a particular
// inventoryItem. The solution gets the relevant transactions by comparing
// the inventory.id of each transaction to the value of the inventoryItem
// argument. It keeps the transaction only if these two values are equal.