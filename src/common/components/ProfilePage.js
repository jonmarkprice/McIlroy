const React = require('react');

class ProfilePage extends React.Component {
  render() {
    const user = this.props.user;
    return (
      <div>
        <p>
          ID: {user.id}<br/>
          Username: {user.username}<br/>
          Program count: {user.programs.length}<br/>
        </p>
        <a href="/api/user/logout">Log out</a>
      </div>
    );
  }
}

module.exports = ProfilePage;
