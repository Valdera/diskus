import React from 'react';
import ForgotPassword from '../../components/forgot-password/forgot-password.component';
import Signin from '../../components/signin/signin.component';
import Signup from '../../components/signup/signup.component';
import './loginpage.styles.scss';

const LoginPage = () => {
  return (
    <div className="loginpage">
      <div className="loginpage__signin">
        <Signin />
        <ForgotPassword />
      </div>
      <div className="loginpage__signup">
        <Signup />
      </div>
    </div>
  );
};

export default LoginPage;
