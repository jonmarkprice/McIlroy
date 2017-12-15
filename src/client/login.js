const React           = require('react');
const { render }      = require('react-dom');
const { Provider }    = require('react-redux');
const Token           = require('../../shared/components/Token');
const Banner          = require('../../shared/components/Banner');
const configureStore  = require('../common/configureStore');

console.log("Logging on...");
const store = configureStore(undefined); 

// TODO move up into helper?
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

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.usernameUpdate.bind(this);
  }

  usernameUpdate() {
    console.log("attempting to log in");
    send(this.nameField.value);
  }

  render() {
    return (
      <div id="login-component">
        <Banner username={'hardcoded'} showName={false} />
        <form id="login" action="/api/user/login" method="POST">
          <legend>Log In</legend>

          <label htmlFor="username" id="username-label">User name</label>
          <input name="username" id="username" type="text" ref={x => { this.nameField = x }} />

          <label htmlFor="password" id="password-label">Password</label>
          <input id="password" type="password" disable="disable" />
          <input id="submit"   type="submit" value="Log in" />
        </form>
      </div>
    );
  }
}

// TODO: this needs to be done SS
render(
  <Login />,
  document.getElementById('app')
);
