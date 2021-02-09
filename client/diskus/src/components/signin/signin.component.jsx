import React, { useState } from 'react';
import RadiusButton from '../../components/radius-button/radius-button.component';
import './signin.styles.scss';
import { signInStart } from '../../redux/auth/auth.actions';
import { connect } from 'react-redux';

const Signin = ({ signInStart }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await signInStart({ email, password });
    setEmail('');
    setPassword('');
  };

  return (
    <form className="signin" onSubmit={handleSubmit}>
      <div className="signin__text">
        <h1>I already have an account</h1>
        <p>Sign in with your email and password</p>
      </div>
      <div className="signin__input">
        <p className="signin__field">Email</p>
        <input
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <div className="signin__input">
        <p className="signin__field">Password</p>
        <input
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </div>
      <div className="signin__button">
        <RadiusButton custom="orange" type="submit">
          Login
        </RadiusButton>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => ({
  signInStart: (payload) => dispatch(signInStart(payload))
});

export default connect(null, mapDispatchToProps)(Signin);
