const React = require('react');
const Token = require('./Token');

class ProgramRow extends React.Component {
  render() {
    let tokens = [];
    this.props.program.forEach((token, index) => {
      tokens.push(<Token text={token} key={index} />);
    });
    return (<div className="row">{tokens}</div>);
  }
}

module.exports = ProgramRow;
