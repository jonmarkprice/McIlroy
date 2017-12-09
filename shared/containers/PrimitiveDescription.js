const React = require('react');
const { connect } = require('react-redux');
const descriptions = require('../parser/descriptions');
const Example = require('../components/Example');

class Container extends React.Component {
  render() {
    if (descriptions.has(this.props.name)) {
      const desc  = descriptions.get(this.props.name);
      const title = (desc.hasOwnProperty('name'))
                  ? desc.name
                  : this.props.name;
      const example = (desc.hasOwnProperty('example'))
                    ? <Example program={desc.example.in}
                               result={desc.example.expect} />
                    : "";
      return (
        <div id="information" className="box">
          <h2>Info</h2>
          <h3 id="function-name">{title}</h3>
          <p>{desc.text}</p>
          {example}
        </div>
      );
    }
    else {
      return (
        <div id="information" className="box">
          <h2>Info</h2>
          <h3 id="function-name">{this.props.displayed.name}</h3>
          <p><em>No description added.</em></p>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  name: state.displayed.name
});

const PrimitiveDescription = connect(mapStateToProps, undefined)(Container);
module.exports = PrimitiveDescription