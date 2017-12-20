const React   = require('react');
const Banner  = require('./Banner');

const RegistrationForm = () => (
  <form id="registration-form"
    action="/api/user/register"
    method="POST">
    <h2>Register</h2>

    <label className="username" htmlFor="username">Username</label>
    <input className="username" id="username" name="username" type="text" />

    <label className="pw" htmlFor="pw">Password</label>
    <input className="pw" id="pw" name="pw" type="password" />

    <label className="pw-conf" htmlFor="pw-conf">Confirm password</label> 
    <input className="pw-conf" id="pw-conf" name="pwConfirm" type="password" />

    <input id="submit" type="submit"/>
  </form>
);

const RegistrationPage = ({}) => (
  <div id="page">
    <Banner username="" showName={false} />
    <RegistrationForm />
  </div>
);

module.exports = RegistrationPage;
