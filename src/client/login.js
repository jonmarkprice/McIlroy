const React       = require('react');
const { hydrate } = require('react-dom');
const LoginPage   = require('../common/components/LoginPage');

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

hydrate(
  // Scale up with Redux if needed.
  <LoginPage flash={preloadedState.flash} />,
  document.getElementById('app')
);
