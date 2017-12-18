const R = require('ramda');

// This reducer deals with requests to the server
// This essentially comes between the *final* data in saved, and the UI-state.
// These actions will be updated by dispatches from async actions.
/* Shape:
  requests: [...{
    event : ('edit' | 'delete' | 'create'),
    status : ('pending' | 'succeeded' | 'failed'),
    data : <any>,
    ui_index: integer
  }],
*/

// I think this should be an object {} mapping UI -> Request status
function requestsReducer(state = [], action) {
  switch (action.type) {
    case 'OPEN_REQUEST':
      // action params: (ui_index, event, [data])
      return Object.assign({}, state, {
        [action.ui_index]: {
          event: action.event,
          status: 'pending'
          // May want to store the data here, so i know what the
          // request has.
        }
      });
    case 'SUCCEED_REQUEST':
      // action params: (ui_index)
      return Object.assign({}, state, {
        [action.ui_index]: {
          status: 'succeeded'
        }
      });
    case 'FAIL_REQUEST':
      // action params: (ui_index)
      return Object.assign({}, state, {
        [action.ui_index]: {
          status: 'failed'
        }
      });
    default:
      return state;
  }
}

module.exports = requestsReducer;
