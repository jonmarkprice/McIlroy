import {has, prop, all, equals} from 'ramda';
import * as R from 'ramda';

// @flow
export class StackSlice {
  // properties

  constructor(args : any[]) : void {
    if (Array.isArray(args)) {
      this.__stack = args; // save arguments
      this.__bad  = false;
    }
    else {
      this.__bad = true;
    }
  }

  // TODO: we actually know a lot about f, it should have
  // a fn, an arity, and display
  apply(f : any) : StackToken | StackError {
    if (this.__bad) {
      return new StackError('Bad construction');
    }

    // Is something wrong with this?
    else if (all(x => equals(R.type(x), 'Object'), this.__stack)
          && all(has('type'), this.__stack)
          && all(x => equals(prop('type', x), 'boolean'), this.__stack))
    {
      // console.log('APPLY');
      // console.log(this.__stack);
      // console.log(f.display);
      // XXX somehow hitting the functional.test.js, (3 (4 +) curry) curry
      
      // TODO check types.
      // TODO check arity
      // TODO check has value prop
      // TODO check has fn
      const values = this.__stack.map(prop('value'));
      return new StackToken(f.fn(...values));
    }
  
    else {
      // DEBUGGING
      if (all(x => equals(R.type(x), 'Boolean'), this.__stack)) {
//        console.log('BOOL');
        console.log(this.__stack);

//        return new StackToken(f.fn(...this.__stack.map(prop('value'))))
      }

      // "Naked" stack
      // no type checking
      return new StackToken(f.fn(...this.__stack));
    }
  }
}

export class StackError {
  constructor(msg : string) : void {
    this.__message = msg;
  }

  ok() : boolean {
    return false;
  }

  error() : string {
    return this.__message;
  }
}

export class StackToken {
  constructor(data : any) { // T
    this.__data = data; // value (?)
  }

  ok() : boolean {
    return true;
  }

  unwrap() : any { // T
    return this.__data;
  }
}
