import React from 'react';
import RadiusButton from '../../components/radius-button/radius-button.component';
import './signup.styles.scss';

const Signup = () => {
  return (
    <form className="signup">
      <div className="signup__text">
        <h1>I do not have an account</h1>
        <p>Sign up with your email and password</p>
      </div>
      <div className="signup__input">
        <p className="signup__field">Name</p>
        <input type="text" />
      </div>
      <div className="signup__input">
        <p className="signup__field">Email</p>
        <input type="email" />
      </div>
      <div className="signup__input">
        <p className="signup__field">Password</p>
        <input type="password" />
      </div>
      <div className="signup__input">
        <p className="signup__field">Password Confirm</p>
        <input type="password" />
      </div>
      <div className="signup__button">
        <RadiusButton type="orange">Sign Up</RadiusButton>
      </div>
    </form>
  );
};

export default Signup;
