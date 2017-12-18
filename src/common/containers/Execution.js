const React       = require('react');
const { connect } = require('react-redux');
const Token       = require('../components/Token');
const { parseProgram } = require('../parser/program');
const S = require('sanctuary');
const R = require('ramda');

const mapStateToProps = state => ({
  program: state.program,
  inputData: state.input.list[state.input.selected].data
});

class ExecutionRows extends React.Component {
  render() {
    // The program applied to the data
    // NOTE: We use null for no input, so do not include.
    const input = this.props.inputData;
    const applied = (input !== null)
                  ? [input].concat(this.props.program)
                  : this.props.program;

    // Populate rows
    let rows = [];
    // [ ] include stack mabye in return
    // [ ] wrap all in encaseEither()
    // [ ] print error with bimap
    const result = parseProgram(applied);
    const steps = result.steps;
    // TODO: if (result.stack) // isLeft -> display error

    steps.forEach((step, stepIndex) => {
      const tokens = step.map((text, index) => (
        <Token text={text} key={index} />
      )); 
      // Fill row with step
      rows.push(<div className="row" key={stepIndex}>{tokens}</div>);
    });

    if (S.isLeft(result.stack)) {
      const message = S.either(S.toString, R.always('No Error'), result.stack);
      rows.push(<div className="row error" key="error">
        <h3>Error:</h3>{message}
      </div>);
    }

    return (
      <div id="execution" className="box">
        <h2>Execution</h2>
        {rows}
      </div>
    );
  }
}

const Execution = connect(mapStateToProps, undefined)(ExecutionRows);
module.exports = Execution;
