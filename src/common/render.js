import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux'

//import App from './app';
import Interpretter from './components/components';
import reducer from './reducers';
import { pushInput, displayFunction } from './actions';

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
      <script src="static/bundle.js"></script>
    </body>
  </html>`;
}

export default renderPage;
