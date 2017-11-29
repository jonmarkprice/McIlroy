const test = require('tape');
const S = require('sanctuary');
const { Right, Left } = S;
// const { interpretTypes } = require('../../common/lang/typecheck');
const { addTypes } = require('../../common/lang/addTypes');

test('interpret', assert => {
  const annot1 = {
    in: [], // don't care
    out: {name: 'Number'},
  };

  assert.deepEquals(
    addTypes(Right([]), Right(annot1), Right({value: 3})),
    Right({type: {name: 'Number'}, value: 3, token: "Value"})
  );

/*
  const annot2 = {
    in: [{name: 'Variable', id: 1}],
    out: {name: 'Variable', id: 1}
  }

  // TODO: try variable
  assert.deepEquals(
    S.join(S.lift3(
      interpretTypes,
      Right([{type: {name: 'Char'}, value: 'X'}]), // need a type: {name: _}
      Right(annot2),
      Right(null) // never used
    )),
    Right({name: 'Char'})
  );

  // TODO: try any
  assert.deepEquals(
    S.join(S.lift3(
      interpretTypes,
      Right([]), // Doesn't matter
      Right({in: [], out: {name: 'Any'}}), // annotation.in shouldn't matter
      Right(true) // Matters
    )),
    Right({name: 'Boolean'})
  );

  assert.deepEquals(
    S.join(S.lift3(
      interpretTypes,
      Right([]),
      Right({in: [], out: {name: 'List'}}),
      Right(null) //or [{name: true}, {name: 'A'}, {name: 3}])
    )),
    Right({name: 'List'})
  );
*/
  assert.end();
});


