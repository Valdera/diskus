import React from 'react';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/auth.selector';
import { createStructuredSelector } from 'reselect';
import PopularBubble from '../../components/popular-bubble/popular-bubble.component';
import Biodata from '../../components/biodata/biodata.component';
import Submit from '../../components/submit/submit.component';
import Following from '../../components/following/following.component';
import Post from '../../components/post/post.component';
import './profilepage.styles.scss';

const ProfilePage = ({ currentUser }) => {
  return (
    <div className="profilepage">
      <div className="profilepage__welcome">
        <div className="profilepage__welcome-text">
          <h1 className="profilepage__welcome-title">Welcome Back,</h1>
          <h1 className="profilepage__welcome-name">
            {currentUser.name.substring(0, 15)}
          </h1>
          <p className="profilepage__welcome-popular">Popular Post : </p>
        </div>
        <PopularBubble />
        <PopularBubble />
        <PopularBubble />
      </div>

      <div className="profilepage__biodata">
        <Biodata user={currentUser} />
      </div>

      <div className="profilepage__submit">
        <Submit user={currentUser} />
      </div>

      <div className="profilepage__following">
        <h1>Your Following</h1>
        <div className="profilepage__following-list">
          {currentUser.followingDetail.map((user) => (
            <Following user={user} key={user._id} />
          ))}
        </div>
      </div>

      <div className="profilepage__post">
        <h1>Your Post</h1>
        <div className="profilepage__post-list">
          {currentUser.discussions.map((discussion) => (
            <Post discussion={discussion} key={discussion.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps)(ProfilePage);
