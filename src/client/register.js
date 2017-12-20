const React       = require('react');
const { render }  = require('react-dom');
const Banner      = require('../common/components/Banner');
const Register    = require('../common/components/Register');

const RegistrationPage = ({}) => (
  <div id="page">
    <Banner username="" showName={false} />
    <Register />
  </div>
);

render(
  <RegistrationPage />,
  document.getElementById('app')
);
