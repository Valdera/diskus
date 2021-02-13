import React, { useState } from 'react';
import { connect } from 'react-redux';

import { forgotPasswordStart } from '../../redux/auth/auth.actions';
import './forgot-password.styles.scss';

const ForgotPassword = ({ forgotPasswordStart }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (email) {
      await forgotPasswordStart(email);
    }
  };

  return (
    <form className="forgot-password">
      <p>Forgot your password ?</p>
      <div className="signin__input">
        <p className="signin__field">Email</p>
        <input
          type="email"
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
        />
      </div>
      <span onClick={() => handleSubmit()}>Forgot Password &rarr;</span>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => ({
  forgotPasswordStart: (payload) => dispatch(forgotPasswordStart(payload))
});

export default connect(null, mapDispatchToProps)(ForgotPassword);
