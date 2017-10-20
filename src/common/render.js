import ReactDOMServer from 'react-dom/server';
import App from './app';
import reducer from './reducers'; // index.js
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

// http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
function renderPage(message) {
  const preloadedState = message; // wrap with { }?
  const store = createStore(reducer, preloadedState);
  const finalState = store.getState();
  const stateString = JSON.stringify(finalState).replace(/</g, '\\u003c');
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Redux Universal</title>
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

module.exports = renderPage;
//export default render; // doesn't seem to work with require() in server/index
