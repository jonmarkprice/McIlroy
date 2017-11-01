//@flow

const add = (x : number, y : number) => x + y;

console.log(add(1, 2));
// console.log(add('a', 'b')); // This should spawn an error.

function twice(f : (number, number) => number) {
  return f(f(1, 2), 3);
}

twice(add);

function cat(x : string, y : string) : string {
  return x + ' ' + y;
}

//twice(cat) 