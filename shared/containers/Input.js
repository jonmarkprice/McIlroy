const React           = require('react');
const { connect }     = require('react-redux');
const { selectInput } = require('../actions');

class InputList extends React.Component {
  render() {
    let items = [];
    this.props.input.forEach((item, index) => {
      const select = (index === this.props.selected) ? ' em' : '';
      items.push(
        <div className={"input-item" + select} key={index}
             onClick={() => this.props.onInputSelect(index)}>
          {item.label}
        </div>);
    });
    return (
      <div className="box">
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

const mapDispatchToProps = dispatch => ({
  onInputSelect: text => {
    dispatch(selectInput(text))
  }
});

const Input = connect(mapStateToProps, mapDispatchToProps)(InputList);
module.exports = Input;
