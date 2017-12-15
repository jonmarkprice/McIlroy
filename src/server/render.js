const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const dbg = require('debug')('render');
const configureStore = require('../common/configureStore');
const { Provider } = require('react-redux');
const Interpretter = require('../../build/containers/Interpretter');
const { pushInput } = require('../../build/actions/input');
const { addProgram } = require('../../build/actions/saved');
const { login } = require('../../build/actions/user');

function setup() {
  const store = configureStore(undefined); // Start with undefined, so we get
                                           // from individual reducers.

  // Dispatch some actions
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
  store.dispatch(login('fake'));

  return store;
}

function addAliases(programs, store) {
  dbg('Store: %O', store);
  dbg('Got programs: %O', programs);

  programs.map(({name, expansion}) => 
    store.dispatch(addProgram(name, expansion)));
  return store;
}

function renderPage(programs) {
  let store = setup();  // This is not as performant as if we had used a
                        // closure, but it is safer.
  store = addAliases(programs, store);
  const finalState = store.getState();

  dbg('State: %O', finalState);

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
      <script type="text/javascript" src="static/app.bundle.js"></script>
    </body>
  </html>`;
}

module.exports = renderPage;
