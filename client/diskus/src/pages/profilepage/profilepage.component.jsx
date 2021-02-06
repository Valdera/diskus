import React from 'react';
import PopularBubble from '../../components/popular-bubble/popular-bubble.component';
import Biodata from '../../components/biodata/biodata.component';
import Submit from '../../components/submit/submit.component';
import Following from '../../components/following/following.component';
import Post from '../../components/post/post.component';
import './profilepage.styles.scss';

const ProfilePage = () => {
  return (
    <div className="profilepage">
      <div className="profilepage__welcome">
        <div className="profilepage__welcome-text">
          <h1 className="profilepage__welcome-title">Welcome Back,</h1>
          <h1 className="profilepage__welcome-name">Valdera</h1>
          <p className="profilepage__welcome-popular">Popular Post : </p>
        </div>
        <PopularBubble />
        <PopularBubble />
        <PopularBubble />
      </div>

      <div className="profilepage__biodata">
        <Biodata />
      </div>

      <div className="profilepage__submit">
        <Submit />
      </div>

      <div className="profilepage__following">
        <h1>Your Following</h1>
        <div className="profilepage__following-list">
          <Following />
          <Following />
          <Following />
          <Following />
        </div>
      </div>

      <div className="profilepage__post">
        <h1>Your Post</h1>
        <div className="profilepage__post-list">
          <Post />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
