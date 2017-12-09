const React         = require('react');
const { connect }   = require('react-redux');
const descriptions  = require('../parser/descriptions');
const PrimitiveDescription = require('./PrimitiveDescription');
// const DerivedDescription = require('./DerivedDescription');

// TODO: Consider encapsulating into larger component
// since we will always need at least "Info" header.
class InfoPane extends React.Component {
  render() {
    if (this.props.displayed === null) {
      return (
        <div id="information" className="box">
          <h2>Info</h2>
        </div>
      );
    } else if (this.props.displayed.built_in) { // or primitive?
      return (<PrimitiveDescription name={this.props.displayed.name} />);
    } else {
      // return <DerivedDescription name={this.props.displayed.name} />;
      return (<div>this.props.displayed.name</div>);
    }
  }
}

const mapStateToProps = (state) => ({
  displayed: state.displayed
});

const Info = connect(mapStateToProps, undefined)(InfoPane);

module.exports = Info;
