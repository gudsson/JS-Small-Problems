let car = {
  make: 'Honda',
  model: 'Civic'
};

for (let attribute in car) {
  console.log(attribute);
  console.log(car[attribute]);
}