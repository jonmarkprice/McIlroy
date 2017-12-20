const React       = require('react');
const { render }  = require('react-dom');
const Banner      = require('../common/components/Banner');
const LoginForm   = require('../common/components/LoginForm');

// TODO move up into helper?
/*
const loadPost = (data) => ({
  method  : 'POST',
  headers : new Headers({
    'Content-Type': 'application/json'
  }), 
  mode    : 'cors', 
  cache   : 'default',
  body    : JSON.stringify(data)
});

const send = (username) => {
  const payload = loadPost({username});
  return fetch('/api/user/login', payload)
  .then(res => {
    console.log(res);  // TODO display resp. to user
  }); // TODO catch and display to user
}
*/

class LoginPage extends React.Component {
  render() {
    return (
      <div id="page">
        <Banner username="" showName={false} />
        <LoginForm />
      </div>
    );
  }
}

// TODO: this needs to be done SS
render(
  <LoginPage />,
  document.getElementById('app')
);
