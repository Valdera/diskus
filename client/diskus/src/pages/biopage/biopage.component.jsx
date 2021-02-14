import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';
import RadiusButton from '../../components/radius-button/radius-button.component';
import Post from '../../components/post/post.component';
import Spinner from '../../components/spinner/spinner.component';
import './biopage.styles.scss';
import {
  selectCurrentUser,
  selectSelectedUser
} from '../../redux/auth/auth.selector';
import {
  followUserStart,
  getUserStart,
  unfollowUserStart
} from '../../redux/auth/auth.actions';

const BioPage = ({
  match,
  getUserStart,
  user,
  followStart,
  unfollowStart,
  currentUser
}) => {
  const getUser = async () => {
    await getUserStart(match.params.id);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const followUser = async () => {
    await followStart(user.id);
  };

  const unfollowUser = async () => {
    await unfollowStart(user.id);
  };

  return (
    <div className="biopage">
      {user ? (
        <div className="biopage__content">
          <div className="biopage__picture">
            <ProfilePicture src={user.image} type="large" />
            {currentUser && user.id !== currentUser.id ? (
              user.follower.includes(currentUser.id) ? (
                <RadiusButton
                  custom="orange-smallflip"
                  onClick={() => unfollowUser()}>
                  Unfollow
                </RadiusButton>
              ) : (
                <RadiusButton
                  custom="orange-small"
                  onClick={() => followUser()}>
                  Follow
                </RadiusButton>
              )
            ) : (
              ''
            )}
          </div>
          <div className="biopage__text">
            <h1>{user.name}</h1>
            <span>Last active 1 days ago</span>
            <p>{user.description}</p>
          </div>
        </div>
      ) : (
        ''
      )}

      {user ? <h2 className="biopage__title">Fauzan Valdera's Post</h2> : ''}

      {user ? (
        <div className="biopage__post">
          {user.discussions.map((discussion) => (
            <Post
              discussion={discussion}
              key={discussion.id}
              clickableVote={false}
            />
          ))}
        </div>
      ) : (
        ''
      )}

      {!user ? (
        <div className="biopage__spinner">
          <Spinner />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getUserStart: (payload) => dispatch(getUserStart(payload)),
  followStart: (payload) => dispatch(followUserStart(payload)),
  unfollowStart: (payload) => dispatch(unfollowUserStart(payload))
});

const mapStateToProps = createStructuredSelector({
  user: selectSelectedUser,
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(BioPage);
