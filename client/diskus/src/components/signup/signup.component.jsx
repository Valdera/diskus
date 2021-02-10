import React, { useState } from 'react';
import { connect } from 'react-redux';
import RadiusButton from '../../components/radius-button/radius-button.component';
import { emailSignUpStart } from '../../redux/auth/auth.actions';
import './signup.styles.scss';

const Signup = ({ emailSignUpStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await emailSignUpStart({ name, email, password, passwordConfirm });
    setName('');
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <div className="signup__text">
        <h1>I do not have an account</h1>
        <p>Sign up with your email and password</p>
      </div>
      <div className="signup__input">
        <p className="signup__field">Name</p>
        <input
          type="text"
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
      </div>
      <div className="signup__input">
        <p className="signup__field">Email</p>
        <input
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <div className="signup__input">
        <p className="signup__field">Password</p>
        <input
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </div>
      <div className="signup__input">
        <p className="signup__field">Password Confirm</p>
        <input
          type="password"
          value={passwordConfirm}
          onChange={(evt) => setPasswordConfirm(evt.target.value)}
        />
      </div>
      <div className="signup__button">
        <RadiusButton custom="orange" type="submit">
          Sign Up
        </RadiusButton>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  emailSignUpStart: (payload) => dispatch(emailSignUpStart(payload))
});

export default connect(null, mapDispatchToProps)(Signup);
