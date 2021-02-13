import React from 'react';
import { ReactComponent as EmptySvg } from '../../assets/emptySvg.svg';
import './errorpage.styles.scss';

const ErrorPage = () => {
  return (
    <div className="errorpage">
      <div className="errorpage__svg">
        <EmptySvg />
      </div>
      <h2>Invalid URL</h2>
      <p>
        Please Contact <span>diskusapp@gmail.com</span> if you can't solve this
      </p>
    </div>
  );
};

export default ErrorPage;
