// Goal: Make an Either class and a List of Either classes (possibly without a new class)
// I want both sides of the Either to be of the same class. I don't like how the Mostly Adequate Guide does it.
// ... nevermind that is actually a lot easier to implement...

// @flow
export type Either<T> = Left | Right<T>;

class Left {
    __valid : boolean;
    __value : string;
    
    // Start with a constructor, later may change to .Left()/.Right() like Monet.
    constructor (value : string) : void {
        this.__valid = false;
        this.__value = value;
    }

    static of(x : string) : Left {
        return new Left(x);
    }

    map(f : any) : Left {
        return this; // Do nothing
    }

    // or isRight
    ok() : boolean {
        return false;
    }

    // or left()
    left() : string {
        return this.__value;
    }

    join() : Left {
        return this; // Do nothing
    }
    
    chain(f : (any) => any) : Left {
        // this.map(f).join() both return this
        return this; // Do nothing
    }

    ap(other : Either<any>) : Left {
        // only works for curried functions
        return this;
    }
}

class Right<T> {
    __valid : boolean;
    __value : T;

    constructor(value : T) {
        this.__valid = true;
        this.__value = value;
    }

    static of(x : T) : Right<T> {
        return new Right(x);
    }

    map(f : any) : Right<T> {
        return Right.of(f(this.__value));
    }

    join() : T {
        return this.__value;
    }

    chain(f : (x : any) => any) : T {
        return this.map(f).join();
    }

    ap(other : Either<T>) : Either<T> {
        return other.map(this.__value);
    }

    ok() : boolean {
        return true;
    }

    right() : T {
        return this.__value;
    }
}

// Can a Right return a Left?
// I can see where a Maybe<x> can return a Maybe<null>, at least where it 
// would be useful, but what about a similar behavior with Either?

// TODO: bring over maybe tests and rewrite for either.js

module.exports = { Left, Right };