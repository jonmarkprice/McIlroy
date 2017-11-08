const React = require('react');
const ReactDOM = require('react-dom');
const ReactDOMServer = require('react-dom/server');
const { createStore } = require('redux');
const { Provider } = require('react-redux');

//const App = require('./app');
const Interpretter = require('./components/components');
//const reducer = require('./reducers');
const reducer = require('./reducers');
const { pushInput, displayFunction } = require('./actions');

//const preloadedState = message;
const store = createStore(reducer); //, preloadedState);

// dispatch some actions
store.dispatch(pushInput({
  label : '1',
  data  : 1
}));
store.dispatch(pushInput({
  label : '[1, 2, 3]',
  data  : [1, 2, 3]
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

store.dispatch(displayFunction('Nothing selected.'));

function renderPage() {
  const finalState = store.getState();
  const stateString = JSON.stringify(finalState).replace(/</g, '\\u003c');
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <Interpretter />
    </Provider>
  );

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
