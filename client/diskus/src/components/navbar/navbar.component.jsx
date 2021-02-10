import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/auth/auth.selector';
import { signOutStart } from '../../redux/auth/auth.actions';
import RadiusButton from '../radius-button/radius-button.component';
import ProfilePicture from '../profile-picture/profile-picture.component';
import './navbar.styles.scss';

const Navbar = ({ history, currentUser, signOutStart }) => {
  const [search, setSearch] = useState('');
  const handleLogout = async () => {
    await signOutStart();
    history.push('/login');
  };

  return (
    <div className="navbar">
      <h3 className="navbar__logo" onClick={() => history.push('/timeline')}>
        <span>D</span>iskus
      </h3>
      <form action="#" className="search">
        <input
          type="text"
          className="search__input"
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          placeholder="Search Discussion"
        />
        <button
          className="search__button"
          onClick={() => history.push(`/search/${search}`)}>
          <i className="fas fa-search"></i>
        </button>
      </form>
      <div className="navbar__btn">
        {currentUser ? (
          <RadiusButton custom="orange" onClick={handleLogout}>
            Logout
          </RadiusButton>
        ) : (
          <RadiusButton custom="orange" onClick={() => history.push('/login')}>
            Login
          </RadiusButton>
        )}
      </div>
      <ProfilePicture
        src={currentUser ? currentUser.image : './img/default-user.jpg'}
        handleClick={() => history.push('/profile')}
      />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
