const test = require('tape');
const { createSteps } = require('../common/lang/parse.js');
const { tokenize_ } = require('../common/lang/tokenize');

test('one step', (assert) => {
  assert.deepEqual(
    createSteps([1, 2, '+', ':'].map(tokenize_)),
    [
      ["1", "2", "+", ":"], // or similar
      ["3"]
    ]
  );

  assert.end();
});

// multiple step (a la. some integration tests)

// Before implementing createSteps:
// 1. fix / decide on tokenize
// 2. decide on how to handle failure
// 3. decide where 'steps' should go.

/*
Here's my intuition: I needed to have steps in the accumulator to deal with alias expansion.
How did I do it before? I can't remember, but I do know that, before aliases, a program was
guaranteed to take only as many steps as :. How does this change with aliases?

With an alias, one might do:
[14, 23, 45] average :
-> [14, 23, 45] [sum, len] into : / apply :
-> [82, 3] / apply :
-> 27.3

This could have been even worse if we would have expanded sum, but currently we
are not (planning to) expand applicatives.

I might leave each token in a step as a token, or I might map display over them.
--
Technically, a single token on the stack can fail, but the stack itself may not
..., or maybe it could.., depends on how we look at things. If a token faild,
really that would basically just be a null or a Nothing... the thing is, once I
know a computation will fail, as a do as soon as we encounter a bottom (⊥) know
the computation will fail, so there is no reason to add a check to each
function, better to just use an Either or Maybe, and since we pass the function
a *slice* of the stack, it becomes easier to make the whole stack a functor.
On the other hand, I could use sequence (with Sanctuary) to pass the arguments
individually. 
The real question here however, is whether the Either should be even "higher"
than that, i.e. over the whole accumulator. If it is not I can pass an object
containing a list of steps and an Either<err, stack> -- alternatively, I can
keep tthe steps somewhere else, or make functions that have side effects.

This does not seem to be the best way to go about it though. A third option
would be to make the steps be overwritten by the error. This is probably fine
for now, as far as I am concerned, ideally (at some later date) we would have
the ability to pinpoint where everything went wrong, by keeping the steps
separate from the Either -- or changing the structure of the either so that
it would save the current information in the Left.
This might be nice anyway, so that we could see a chain of errors, instead of
getting the newest/oldest only.

TODO: See explorations/../sanctuary/maybe-nesting.js for some tests.
CONCLUSIONS: In short flatter is better for access, harder for R.over/R.set because it breaks
the lensProp chain.
*/

