const React = require('react');
const { connect } = require('react-redux');

const mapStateToProps = state => ({
  username: state.user.name
});

class BannerComponent extends React.Component {
  render() {
    const {username} = this.props;
    const User = (
      <div id="user-control">
        <div id="user-greeting">Hello, {username}</div>
        <a href="/logout">Log out</a>
      </div>
    );
    const noUser = (
      <div id="user-control">
        <a href="/login">Log in</a>
      </div>
    );
    const userControl = username === null ? noUser : User;
    return (
      <div id="banner">
        <h1 id="title">McIlroy</h1>
        {userControl}
      </div>
    );
  }
}

const Banner = connect(mapStateToProps)(BannerComponent);
module.exports = Banner;
