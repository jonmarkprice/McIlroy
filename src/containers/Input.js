import React from 'react';
import { connect } from 'react-redux';
import { selectInput } from '../actions';

class InputList extends React.Component {
  render() {
    let items = [];
    this.props.input.forEach((text, index) => {
      const select = (index === this.props.selected) ? ' em' : '';
      items.push(<div className={"input-item"+select} key={text}>{text}</div>);
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
  input: state.input,
  selected: state.selected
})

const mapDispatchToProps = dispatch => {
  return {
    onInputSelect: text => {
      dispatch(selectInput(text))
    }
  };
};

const Input = connect(mapStateToProps, mapDispatchToProps)(InputList);

export default Input;
