const React       = require('react');
const { syntax, literals, functions } = require('../parser/syntax');
const { connect } = require('react-redux');
const { pushFunction }    = require('../actions/program-canvas');
const { pushToOverlayProgram } = require('../actions/edit');
const { displayPrimitive } = require('../actions/display');

const FunctionPalette = ({pushToCanvas, pushToOverlay, displayInfo, editing}) => {
  const push = editing ? pushToOverlay : pushToCanvas;
  let fns     = [],
      values  = [];
  for (let op of syntax.values()) {
    fns.push(
      <div className="function" key={op}
        onDoubleClick={() => push(op)}
        onClick={() => displayInfo(op)}>
        {op}
      </div>);
  }
  for (let fn of functions.values()) {
    fns.push(
      <div className="function" key={fn}
           onDoubleClick={() => push(fn)}
           onClick={() => displayInfo(fn)}>
        {fn}
      </div>);
  }
  for (let name of literals.keys()) {
    values.push(
      // XXX warning: Don't make functions within a loop
      <div className="value" key={name}
           onDoubleClick={() => push(literals.get(name))}>
        {name}
      </div>);
  }
  return (
    <div id="functions" className="box">
      <h2>Palette</h2>
      <p className="important-notice">
        <em>Double click</em> to add to Canvas.
      </p>
      <div className="functions">
        <h3>Functions</h3>
        {fns}
      </div>
      <div className="values">
        <h3>Values</h3>
        {values}
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    pushToCanvas: token => {
      dispatch(pushFunction(token))
    },
    pushToOverlay: token => {
      dispatch(pushToOverlayProgram(token));
    },
    displayInfo: text => {
      dispatch(displayPrimitive(text))
    }
  };
};

const mapStateToProps = state => ({
  editing: state.edit.editing
})

const Functions = connect(
  mapStateToProps,
  mapDispatchToProps
)(FunctionPalette);

module.exports = Functions;
