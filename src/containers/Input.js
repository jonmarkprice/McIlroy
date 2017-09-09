import React from 'react';
import { connect } from 'react-redux';

class InputList extends React.Component {
  render() {
    let items = [];
    this.props.input.forEach((text, index) => {
      items.push(<div className="input-item" key={index}>{text}</div>);
    });
    return (
      <div id="data" className="box">
        <h2>Input</h2>
        {items}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  input: state.input
})

// TODO need to mapStateToProps, mapDispatchToProps

const Input = connect(mapStateToProps, undefined)(InputList);

export default Input;
