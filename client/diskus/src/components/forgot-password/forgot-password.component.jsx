import React from 'react';
import './forgot-password.styles.scss';

const ForgotPassword = () => {
  return (
    <form className="forgot-password">
      <p>Forgot your password ?</p>
      <div className="signin__input">
        <p className="signin__field">Email</p>
        <input type="email" />
      </div>
      <span>Forgot Password &rarr;</span>
    </form>
  );
};

export default ForgotPassword;
