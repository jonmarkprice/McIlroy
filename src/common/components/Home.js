const React = require('react');

class HomePage extends React.Component {
  render() {
    const user = this.props.user;
    const html = user
      ? <p>Hello, {user.username}. View your <a href="/profile">profile</a>.</p>
      : <p>Welcome! Please <a href="/login">log in</a>.</p>
      return html;
  }
}

module.exports = HomePage;
