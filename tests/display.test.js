const test = require('tape');
const display = require('../src/common/parser/display');

test('should print characters with quotes.', (assert) => {
  assert.equal(display("a"), "'a'");
  assert.end();
});

test('should print special tokens without quotes', (assert) => {
  assert.equal(display(":"), ":");
  assert.end();
});

// test('should recursively display lists');

// test('should use the display (property) of on object.');
