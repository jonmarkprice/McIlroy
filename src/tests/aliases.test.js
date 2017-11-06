// Write unit tests for aliases, should get 'Not parsable'
//import { run } from './helpers';
const { run } = require('./helpers');
const test = require('tape');

// sum
const sum = {type: 'alias', value: ['+', 0, 'reduce', ':']} // need display?

test('sums a list of numbers', (assert) => {
  // fails with 'not parsable'
  assert.equal(run([1, 3, 4], sum, ':'), 8);
  assert.end();
});

// TODO: run could output steps... potentially. Maybe with a 'verbose' argument
// it seems that it is getting to exec somehow...

/*
  A strong motivation (in js and other interpreted languages) for good
  fuction names is a good stack trace.
  Currently I don't have a dedicated function expand aliases -- fix that.
*/
