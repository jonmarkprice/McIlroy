const React       = require('react');
const { hydrate } = require('react-dom');
const RegistrationPage = require('../common/components/RegistrationPage');

hydrate(
  <RegistrationPage />,
  document.getElementById('app')
);
