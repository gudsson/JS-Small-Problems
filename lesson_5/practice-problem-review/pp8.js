let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog'],
};

Object.values(obj).forEach(arr => arr.forEach(ele => {
  console.log(ele.replace(/[^aeiou]/gi,''));
}));