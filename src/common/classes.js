class Maybe {
  constructor(x) {
    this.__value = (x === undefined) ? null : x;
  }

  // same as assigning Constructor.method
  static of(x) {
    return new Maybe(x);
  }

  // same as assigning to Constructor.prototype.method
  map(f) {
    return (this.__value === null)
      ? new Maybe(null)
      : new Maybe(f(this.__value));
  }
}

const m = new Maybe('a')

let x = new Maybe('a').map(x => x.toUpperCase())
x

x = new Maybe()
x.map(x => x + 1);
x

x = Maybe.of(3).map(x => x + 1)
x

//////

// Lets declare a Maybe, and then an error with ES6 classes, and check against the 
// types.

// IDEA: 
/*
I could define an ES6 class, Either, and extend it with Left/Right (or whatever).
However, is there a way to declare an abstract class in ES6? I.e. a class without
a constructor?
*/

// I could define Left and Right as static 'subclasses', i.e. constructor functions
// of Either.
