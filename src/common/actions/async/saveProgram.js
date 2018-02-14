const { getAuthToken
        , getUser } = require('../../../client/helpers/cognito');
const { createOpts } = require('../../../client/helpers/misc');
// const { addProgram } = require('../saved');

const saveProgram = (userId, name, expansion, stage) => dispatch => {
  const body = {
    UserId: getUser().username,
    ProgramName: name || 'untitled',
    ProgramJSON: expansion || []
  };
  const path = '/' + stage + '/programs/save';

  dispatch({type: 'SET_FLASH', message: 'Saving program...'});

  getAuthToken()
  .then(tok => fetch(path, createOpts(body, tok)))
  .then(res => res.json())
  .then( // Two parameter version handles both success & failure.
    parsed => {
      console.log('Response: %s', parsed.message); 
      dispatch({type: 'CLEAR_FLASH'});
    },
    err => {
      console.error(err);
      dispatch({
        type: 'SET_FLASH',
        message: err.message || 'Unknown error'
      });
    }
  );
}

module.exports = saveProgram;
