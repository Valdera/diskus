import React from 'react';
import { withRouter } from 'react-router-dom';
import RadiusButton from '../radius-button/radius-button.component';
import ProfilePicture from '../profile-picture/profile-picture.component';
import './navbar.styles.scss';

const Navbar = ({ history }) => {
  return (
    <div className="navbar">
      <h3 className="navbar__logo" onClick={() => history.push('/timeline')}>
        <span>D</span>iskus
      </h3>
      <form action="#" className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Search Discussion"
        />
        <button
          className="search__button"
          onClick={() => history.push('/search')}>
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="navbar__btn">
        <RadiusButton custom="orange" onClick={() => history.push('/login')}>
          Login
        </RadiusButton>
      </div>
      <ProfilePicture
        src="./img/default-user.jpg"
        handleClick={() => history.push('/profile')}
      />
    </div>
  );
};

export default withRouter(Navbar);
