const React           = require('react');
const { hydrate }     = require('react-dom');
const { Provider }    = require('react-redux');
const Interpretter    = require('../../shared/components/components');
const configureStore  = require('../common/configureStore');
const dbg = require('../common/dbgconf')('client');

dbg('Started successfully!');

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

// const store = createStore(reducer, preloadedState);
const store = configureStore(preloadedState);

hydrate( // was render
  <Provider store={store}>
    <Interpretter />
  </Provider>,
  document.getElementById('app')
);
