const React   = require('react');
const Banner  = require('./Banner');

class LoginForm extends React.Component {
  render() {
    return (
      <div id="login-component">
        <form id="login" action="/api/user/login" method="POST">
          <legend>Log In</legend>

          <label htmlFor="username" id="username-label">User name</label>
          <input name="username"
                 id="username"
                 type="text"/>
          <label htmlFor="password" id="password-label">Password</label>
          <input id="password" type="password" name="password" />

          <div>
            <input id="submit" type="submit" value="Log in" />
            <span>or <a href="/register">Create an account</a></span>
          </div>
        </form>
      </div>
    );
  }
}

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

module.exports = LoginPage;
