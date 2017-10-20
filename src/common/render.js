import ReactDOMServer from 'react-dom/server';
import App from './app';
import reducer from './reducers'; // index.js
import { createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

const store = createStore(reducer);

const html = ReactDOMServer.renderToString(
  <Provider store={store}>
    <App />
  </Provider>
);

const preloadedState = store.getState();

// http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
function renderPage() {
  const stateString = JSON.stringify(preloadedState).replace(/</g, '\\u003c');
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
