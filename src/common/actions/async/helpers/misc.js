const createOpts = (body, token) => ({
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json',
    Authorization: token
  }),
  mode: 'cors',
  body: JSON.stringify(body)
});

const toUsername = email =>
  email.replace('@', '-at-');

module.exports = {
  toUsername
  , createOpts
};
