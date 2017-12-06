// TODO: I should have several tests per action.

const test = require('tape');
const reducer = require('../src/reducers');
const { updateProgramNameBuffer
        , updateProgramName
        , saveAlias
        , addProgram } = require('../src/actions');

const initialState = {
  input     : [{label: '[No Input]', data: null}],
  selected  : 0,
  program   : [],
  displayed : '',
  saved     : {},
  next_id   : 0
}

// 'UPDATE_NAME_BUFFER'
test('should update the correct buffer from the action text', (assert) => {
  const given_state = {
    input     : [{label: '[No Input]', data: null}],
    selected  : 0,
    program   : [],
    displayed : '',
    saved     : {
      '0': {
        name    : 'Untitled',
        program : [],
        buffer  : '',
        editing : true,
        editing_name: true,
        id      : 0
      }
    },
    next_id   : 1
  }

  const expected_state = {
    input     : [{label: '[No Input]', data: null}],
    selected  : 0,
    program   : [],
    displayed : '',
    saved     : {
      '0': {
        name    : 'Untitled',
        program : [],
        buffer  : 'Test', // <- Only change
        editing : true,
        editing_name: true,
        id      : 0
      }
    },
    next_id   : 1
  };
  assert.deepEqual(reducer(given_state, updateProgramNameBuffer(0, 'Test')),
                   expected_state);
  assert.end();
});

// TODO: should we also clear the buffer?
// 'NAME_PROGRAM'
test('should update the name from the buffer', (assert) => {
  const given_state = {
    input     : [{label: '[No Input]', data: null}],
    selected  : 0,
    program   : [],
    displayed : '',
    saved     : {
      '0': {
        name    : 'Untitled',
        program : [],
        buffer  : 'Test',
        editing_name : true,
        editing: false,
        id      : 0
      }
    },
    next_id   : 1
  }
  const expected_state = {
    input     : [{label: '[No Input]', data: null}],
    selected  : 0,
    program   : [],
    displayed : '',
    saved     : {
      '0': {
        name    : 'Test',
        program : [],
        buffer  : 'Test',
        editing_name : false,
        editing: false,
        id      : 0
      }
    },
    next_id   : 1
  };

  assert.deepEqual(reducer(given_state, updateProgramName(0)), expected_state);
  assert.end();
});

// 'SAVE_PROGRAM'
test('should save an empty program', (assert) => {
  const expected_state = {
    input     : [{label: '[No Input]', data: null}],
    selected  : 0,
    program   : [],
    displayed : '',
    saved     : {
      '0': {
        id: 0,
        program: [],
        name: 'Untitled',
        buffer: 'Untitled',
        editing_name: true,
        editing: true,
      }
    },
    next_id   : 1
  }
  assert.deepEqual(reducer(initialState, addProgram()), expected_state);
  assert.end();
});

test('should save a simple alias', assert => {
  const expectedState = {
    input     : [{label: '[No Input]', data: null}],
    selected  : 0,
    program   : [],
    displayed : '',
    saved     : {
      '0': {
        id: 0,
        program: [3, '*'],
        name: 'simple',
        buffer: 'simple',
        editing_name: false,
        editing: false,
      }
    },
    next_id   : 1
  };
  assert.deepEqual(reducer(initialState, saveAlias('simple', [3, '*'])), expectedState);
  assert.end();
});

/* XXX: This test never did anythig!
test('should save a short program', (assert) => {
  const expected_state = {
    input     : [{label: '[No Input]', data: null}],
    selected  : 0,
    program   : ['+', 1, 'curry', ':', 'map', ':'],
    displayed : '',
    saved     : {
      '0': {
        id: 0,
        program: ['+', 1, 'curry', ':', 'map', ':'],
        name: 'Untitled',
        buffer: 'Untitled',
        editing_name: true,
        editing: true,
      }
    },
    next_id   : 1
  }
}) */
