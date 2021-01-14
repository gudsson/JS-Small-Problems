let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

console.log(Object.keys(munsters).filter(member => {
  return munsters[member].gender === 'male';
}).reduce((a, c) => a + munsters[c].age, 0));