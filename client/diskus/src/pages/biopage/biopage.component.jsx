import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';
import RadiusButton from '../../components/radius-button/radius-button.component';
import Post from '../../components/post/post.component';
import './biopage.styles.scss';
import { selectSelectedUser } from '../../redux/auth/auth.selector';
import { getUserStart } from '../../redux/auth/auth.actions';

const BioPage = ({ match, getUserStart, user }) => {
  const getUser = async () => {
    console.log(match.params.id);
    await getUserStart(match.params.id);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="biopage">
      <div className="biopage__content">
        <div className="biopage__picture">
          <ProfilePicture src={user.image} type="large" />
          <RadiusButton custom="orange-small">Follow</RadiusButton>
        </div>
        <div className="biopage__text">
          <h1>{user.name}</h1>
          <span>Last active 1 days ago</span>
          <p>{user.description}</p>
        </div>
      </div>
      <h2 className="biopage__title">Fauzan Valdera's Post</h2>
      <div className="biopage__post">
        {user.discussions.map((discussion) => (
          <Post discussion={discussion} key={discussion.id} />
        ))}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getUserStart: (payload) => dispatch(getUserStart(payload))
});

const mapStateToProps = createStructuredSelector({
  user: selectSelectedUser
});

export default connect(mapStateToProps, mapDispatchToProps)(BioPage);
