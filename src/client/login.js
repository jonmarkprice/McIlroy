const React       = require('react');
const { hydrate } = require('react-dom');
const LoginPage   = require('../common/components/LoginPage');

hydrate(
  <LoginPage />,
  document.getElementById('app')
);
