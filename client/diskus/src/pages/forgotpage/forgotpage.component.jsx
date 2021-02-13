import React, { useState } from 'react';
import './forgotpage.styles.scss';
import { ReactComponent as ForgotSvg } from '../../assets/forgotSvg.svg';
import { resetPasswordStart } from '../../redux/auth/auth.actions';
import { connect } from 'react-redux';

const ForgotPage = ({ match, resetPasswordStart }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    if (password && confirmPassword) {
      await resetPasswordStart({
        password: password,
        passwordConfirm: confirmPassword,
        token: match.params.token
      });
    }
  };

  return (
    <div className="forgotpage">
      <div className="forgotpage__svg">
        <ForgotSvg />
      </div>
      <div className="forgotpage__input">
        <p>Enter your new password:</p>
        <input
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
      </div>
      <div className="forgotpage__input">
        <p>Confirm your new password:</p>
        <input
          type="password"
          value={confirmPassword}
          onChange={(evt) => setConfirmPassword(evt.target.value)}
        />
      </div>
      <button onClick={() => handleSubmit()}>Submit</button>
    </div>
  );
};
const mapDispatchToProps = (dispatch) => ({
  resetPasswordStart: (payload) => dispatch(resetPasswordStart(payload))
});

export default connect(null, mapDispatchToProps)(ForgotPage);
