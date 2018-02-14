const { getAuthToken
        , getUser } = require('../../../client/helpers/cognito');
const { createOpts } = require('../../../client/helpers/misc');
const { removeProgram } = require('../saved');

const deleteProgram = (userId, id, name, stage) => dispatch => {
  const body = {
    UserId: getUser().username,
    ProgramName: name,
  };
  const path = '/' + stage + '/programs/delete';

  getAuthToken()
  .then(tok => fetch(path, createOpts(body, tok)))
  .then(res => res.json())
  .then( // Two parameter version handles both success & failure.
    parsed => {
      console.log('Response: %s', parsed.message);
      dispatch(removeProgram(id)); 
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

module.exports = deleteProgram;
