const React   = require('react');
const Banner  = require('./Banner');
const Flash   = require('./Flash');

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

class RegistrationPage extends React.Component {
  render() {
    const {flash} = this.props;
    return (
      <div id="page">
        <Banner username="" showName={false} />
        <Flash message={flash} />
        <RegistrationForm />
      </div>
    );
  }
}

module.exports = RegistrationPage;
