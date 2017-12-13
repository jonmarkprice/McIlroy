const React         = require('react');
const { connect }   = require('react-redux');
const descriptions  = require('../parser/descriptions');
const PrimitiveDescription = require('./PrimitiveDescription');
const DerivedDescription   = require('./DerivedDescription');

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
      return (<PrimitiveDescription />);
    } else {
      return <DerivedDescription />;
    }
  }
}

const mapStateToProps = (state) => ({
  displayed: state.displayed
});

const Info = connect(mapStateToProps, undefined)(InfoPane);

module.exports = Info;
