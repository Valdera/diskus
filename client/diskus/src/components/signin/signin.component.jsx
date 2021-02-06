import React from 'react';
import RadiusButton from '../../components/radius-button/radius-button.component';
import './signin.styles.scss';

const Signin = () => {
  return (
    <form className="signin">
      <div className="signin__text">
        <h1>I already have an account</h1>
        <p>Sign in with your email and password</p>
      </div>
      <div className="signin__input">
        <p className="signin__field">Email</p>
        <input type="email" />
      </div>
      <div className="signin__input">
        <p className="signin__field">Password</p>
        <input type="password" />
      </div>
      <div className="signin__button">
        <RadiusButton type="orange">Login</RadiusButton>
      </div>
    </form>
  );
};

export default Signin;
