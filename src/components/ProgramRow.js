import React from 'react';

// const ProgramRow = () => {}
class ProgramRow extends React.Component {
  render() {
    // console.log(`program is: ${this.props.program}`);
    let tokens = [];
    this.props.program.forEach((token, index) => {
      tokens.push(<Token text={token} key={index} />);
    });
    return (
      <div className="row">{tokens}</div>
    );
  }
}

// const Token = ({text}) => (
class Token extends React.Component {
  render() {
    return (
      <div className="item">{this.props.text}</div>
    );
  }
}

export default ProgramRow;
