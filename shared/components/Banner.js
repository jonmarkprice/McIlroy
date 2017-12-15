const React = require('react');
// const { connect } = require('react-redux');

// Refactor into a component
// const mapStateToProps = state => ({
//  username: state.user.name
// });

class Banner /*Component*/ extends React.Component {
  render() {
    const showName = this.props.showName !== undefined
      ? this.props.showName 
      : true;
    const User = (
      <div id="user-control">
        <div id="user-greeting">Hello, {this.props.username}</div>
        <a href="/logout">Log out</a>
      </div>
    );
    const noUser = (
      <div id="user-control">
        <a href="/login">Log in</a>
      </div>
    );
    const userControl = this.props.username === null ? noUser : User;
    return (
      <div id="banner">
        <h1 id="title">McIlroy</h1>
        {showName ? userControl : ""}
      </div>
    );
  }
}

// const Banner = connect(mapStateToProps)(BannerComponent);
module.exports = Banner;
