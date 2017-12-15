const React = require('react');
const { connect } = require('react-redux');
const Banner = require('../components/Banner');
const Overlay = require('./Overlay');
const Program = require('../components/Program');
const Palette = require('../components/Palette');

const { logout } = require('../actions/user');

const mapStateToProps = state => ({
  username: state.user.name
});

// This needs to be async and clear the cookie
// Really I should have an API function
const mapDispatchToProps = dispatch => ({
  logout: () => {
    dispatch(logout());
  }
});

const InterpretterComponent = ({username, logout}) => (
  <div className="interpretter">
    <Banner username={username} logout={logout} />
    <Program />
    <Palette />
    <Overlay />
  </div>
);

const Interpretter = connect(mapStateToProps, mapDispatchToProps)
                            (InterpretterComponent);
module.exports = Interpretter;

