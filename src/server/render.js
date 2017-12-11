const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const configureStore = require('../common/configureStore');
const { Provider } = require('react-redux');

const Interpretter = require('../../build/components/components');
// const { pushInput, displayFunction, addProgram } = require('../../build/actions');
const { pushInput } = require('../../build/actions/input');
const { displayFunction } = require('../../build/actions/display'); 
const { addProgram } = require('../../build/actions/saved');

const initialState = {
  input : {
    list     : [{label: '[No Input]', data: null}],
    selected  : 0
  },
  program   : [], 
  displayed : '',
  saved     : {
    programs: {},
    next_id : 0
  }
  // save_ok   : 'NONE_ATTEMPTED'
};

function setup() {
  const store = configureStore(initialState);

  // XXX No real reason to do this... just include in initial state
  // -- I think this was just for debugging
  // dispatch some actions
  store.dispatch(pushInput({
    label : '1',
    data  : 1
  }));
  store.dispatch(pushInput({
    label : '[1, 2, 3, 4]',
    data  : [1, 2, 3, 4]
  }));
  store.dispatch(pushInput({
    label : '[true, false]',
    data  : [true, false]
  }));
  store.dispatch(pushInput({
    label : '"hello"',
    data  : ['h', 'e', 'l', 'l', 'o']
  }));
  store.dispatch(pushInput({
    label : "'A'",
    data  : 'A'
  }));

  // TODO: consider using obj instead, like pushInput
  // store.dispatch(saveAlias('test', [1, 2, '+']));

  store.dispatch(displayFunction('Nothing selected.'));
  return store;
}

function addAliases(programs, store) {
  console.log('-- STORE --');
  console.log(store);

  console.log('-- Got programs: --');
  console.log(programs);

  programs.map(({name, expansion}) => 
    store.dispatch(addProgram(name, expansion)));
  return store;
}

function renderPage(programs) {
  let store = setup();  // This is not as performant as if we had used a
                          // closure, but it is safer.
  store = addAliases(programs, store);

  const finalState = store.getState();

  console.log('STATE');
  console.log(finalState);

  const stateString = JSON.stringify(finalState).replace(/</g, '\\u003c');

  const html = ReactDOMServer.renderToString(
    React.createElement(Provider, {store}, 
      React.createElement(Interpretter, null, null)));

  // See http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>McIlroy</title>
      <link rel="stylesheet" href="public/index.css" />
      <link rel="shortcut icon" href="public/favicon.ico" />
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__PRELOADED_STATE__ = ${stateString}
      </script>
      <script type="text/javascript" src="static/bundle.js"></script>
    </body>
  </html>`;
}

module.exports = renderPage;