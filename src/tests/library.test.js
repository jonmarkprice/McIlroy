const test      = require('tape');
const library   = require('../common/lang/library');
const functions = require('../common/lang/functions');

// We need display for the function implementations (library)
// but we also need the list of functions (functions) for the display
// to avoid a circular dependency, we reproduce the keys of library
// in functions. However, we need to ensure that they remain identical.

test('functions is identical to the keys of the library', (assert) => {
  assert.deepEqual(functions.values(), library.keys());
  assert.end();
});
