const React       = require('react');
const { hydrate } = require('react-dom');
const RegistrationPage = require('../common/components/RegistrationPage');

const preloadedState = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

hydrate(
  // <RegistrationPage />,
  <RegistrationPage flash={preloadedState.flash} />,
  document.getElementById('app')
);
