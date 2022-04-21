const add = (x, y) => x + y;

const PI = 3.14159;

const square = x => x * x;


// whatever you want to be available from a file needs to be exported as below
// and then imported w/ 'require' in another file
module.exports.PI = PI;
module.exports.add = add;
module.exports.square = square;