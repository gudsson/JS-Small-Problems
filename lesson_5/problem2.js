////////////////////////
// Practice Problem 2 //
////////////////////////

// How would you order the following array of objects based on the year
// of publication of each book, from the earliest to the latest?

let books = [
  { title: 'One Hundred Years of Solitude', author: 'Gabriel Garcia Marquez', published: '1967' },
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', published: '1925' },
  { title: 'War and Peace', author: 'Leo Tolstoy', published: '1869' },
  { title: 'Ulysses', author: 'James Joyce', published: '1922' },
  { title: 'The Book of Kells', author: 'Multiple Authors', published: '800' },
];


// let arr = [1,2,3,7,8,4];
// console.log(arr.sort((a,b) => a - b));


console.log(books.sort((a,b) => {
  if (Number(a.published) < Number(b.published)) {
    return -1;
  } else if (Number(a.published) > Number(b.published)) {
    return 1;
  } else {
    return 0;
  }
}));

// // Solution
// books.sort((a, b) => {
//   return Number(a.published) - Number(b.published);
// });