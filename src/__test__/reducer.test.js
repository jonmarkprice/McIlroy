// TODO: actually test the reducer... and actions
// since purely functional, it shouldn't be hard at all...

// I should have several tests per action.
//

import app from '../reducers/index';
import { updateProgramNameBuffer, updateProgramName} from '../actions/index';

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
          id      : 0
        }]
      ]),
      last_id   : 0
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
          id      : 0
        }]
      ]),
      last_id   : 0
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
          editing : true,
          id      : 0
        }]
      ]),
      last_id   : 0
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
          editing : false,
          id      : 0
        }]
      ]),
      last_id   : 0
    };
    expect(app(given_state, updateProgramName(0)))
      .toEqual(expected_state);
  });
});
