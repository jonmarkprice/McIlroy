const React = require('react');

class Flash extends React.Component {
  render() {
    if (this.props.message === null) {
      return (<p className="flash-no-message"></p>);
    } else {
      return (<p className="flash">{this.props.message || ''}</p>);
    }
  }
}

module.exports = Flash;
