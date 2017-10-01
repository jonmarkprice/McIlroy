// TODO: actually test the reducer... and actions
// since purely functional, it shouldn't be hard at all...

// I should have several tests per action.
//

import app from '../reducers/index';
import { updateProgramNameBuffer,
         updateProgramName,
         addProgram } from '../actions/index';

const initialState = {
  input     : [{label: '[No Input]', data: null}],
  selected  : 0,
  program   : [],
  displayed : '',
  saved     : new Map(),
  next_id   : 0
}


describe('UPDATE_NAME_BUFFER', () => {
  it('should update the correct buffer from the action text', () => {
    const given_state = {
      input     : [{label: '[No Input]', data: null}],
      selected  : 0,
      program   : [],
      displayed : '',
      saved     : new Map([
        [0, {
          name    : 'Untitled',
          program : [],
          buffer  : '',
          editing : false,
          editing_name: false,
          id      : 0
        }]
      ]),
      next_id   : 1
    }
    const expected_state = {
      input     : [{label: '[No Input]', data: null}],
      selected  : 0,
      program   : [],
      displayed : '',
      saved     : new Map([
        [0, {
          name    : 'Untitled',
          program : [],
          buffer  : 'Test', // <- Only change
          editing : false,
          editing_name: false,
          id      : 0
        }]
      ]),
      next_id   : 1
    };
    expect(app(given_state, updateProgramNameBuffer(0, 'Test')))
      .toEqual(expected_state);
  });
});

// TODO: should we also clear the buffer?
describe('NAME_PROGRAM', () => {
  it('should update the name from the buffer', () => {
    const given_state = {
      input     : [{label: '[No Input]', data: null}],
      selected  : 0,
      program   : [],
      displayed : '',
      saved     : new Map([
        [0, {
          name    : 'Untitled',
          program : [],
          buffer  : 'Test',
          editing_name : true,
          editing: false,
          id      : 0
        }]
      ]),
      next_id   : 1
    }
    const expected_state = {
      input     : [{label: '[No Input]', data: null}],
      selected  : 0,
      program   : [],
      displayed : '',
      saved     : new Map([
        [0, {
          name    : 'Test',
          program : [],
          buffer  : 'Test',
          editing_name : false,
          editing: false,
          id      : 0
        }]
      ]),
      next_id   : 1
    };
    expect(app(given_state, updateProgramName(0)))
      .toEqual(expected_state);
  });
});

describe('SAVE_PROGRAM', () => {
  it('should save an empty program', () => {
    const expected_state = {
      input     : [{label: '[No Input]', data: null}],
      selected  : 0,
      program   : [],
      displayed : '',
      saved     : new Map([[0,
        {
          id: 0,
          program: [],
          name: 'Untitled',
          buffer: 'Untitled',
          editing_name: false,
          editing: false,
        }
      ]]),
      next_id   : 1
    }
    expect(app(initialState, addProgram())).toEqual(expected_state);
  });
  it('should save a short program', () => {
    const expected_state = {
      input     : [{label: '[No Input]', data: null}],
      selected  : 0,
      program   : ['+', 1, 'curry', ':', 'map', ':'],
      displayed : '',
      saved     : new Map([[0,
        {
          id: 0,
          program: ['+', 1, 'curry', ':', 'map', ':'],
          name: 'Untitled',
          buffer: 'Untitled',
          editing_name: false,
          editing: true,
        }
      ]]),
      next_id   : 1
    }
  })
})
