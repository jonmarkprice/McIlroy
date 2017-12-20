const React = require('react');

class LoginForm extends React.Component {
  render() {
    return (
      <div id="login-component">
        <div id="construction-notice">
          <p>This app is under construction.</p>
          <ul>
            <li>Use <code>test</code> or <code>admin</code> users.</li>
            <li>Password field is disabled.</li>
          </ul>
        </div>
        <form id="login" action="/api/user/login" method="POST">
          <legend>Log In</legend>

          <label htmlFor="username" id="username-label">User name</label>
          <input name="username"
                 id="username"
                 type="text"/>
          <label htmlFor="password" id="password-label">Password</label>
          <input id="password" type="password" disabled />

          <div>
            <input id="submit"   type="submit" value="Log in" />
            <span>or <a href="/register">Create an account</a></span>
          </div>
        </form>
      </div>
    );
  }
}

module.exports = LoginForm;
