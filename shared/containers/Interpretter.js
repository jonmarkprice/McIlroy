const React = require('react');
const { connect } = require('react-redux');
const Banner = require('../components/Banner');
const Overlay = require('./Overlay');
const Program = require('../components/Program');
const Palette = require('../components/Palette');

const mapStateToProps = state => ({
  username: state.user.name
});

const InterpretterComponent = ({username}) => (
  <div className="interpretter">
    <Banner username={username} />
    <Program />
    <Palette />
    <Overlay />
  </div>
);

const Interpretter = connect(mapStateToProps)(InterpretterComponent);
module.exports = Interpretter;

