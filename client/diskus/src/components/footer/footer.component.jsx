import React from 'react';
import './footer.styles.scss';

const Forgot = () => {
  return (
    <div className="footer">
      <p>Follow our social media</p>
      <div className="footer__social">
        <a href="https://www.linkedin.com/in/valdera/">
          <div className="footer__item">
            <i className="fab fa-linkedin"></i>
          </div>
        </a>
        <a href="https://www.instagram.com/fauzanvaldera/">
          <div className="footer__item">
            <i className="fab fa-instagram"></i>
          </div>
        </a>
        <a href="https://www.facebook.com/fauzan.valdera">
          <div className="footer__item">
            <i className="fab fa-facebook-square"></i>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Forgot;
