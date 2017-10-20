import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import App from './app';
import reducer from './reducers';

function renderPage(message) {
  const preloadedState = message;
  const store = createStore(reducer, preloadedState);
  const finalState = store.getState();
  const stateString = JSON.stringify(finalState).replace(/</g, '\\u003c');
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // See http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
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

export default renderPage;
