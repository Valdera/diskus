import React from 'react';
import { withRouter } from 'react-router-dom';
import Category from '../category/category.component';
import ProfilePicture from '../profile-picture/profile-picture.component';
import Vote from '../vote/vote.component';

import './post.styles.scss';

const Post = ({ history }) => {
  return (
    <div className="post">
      <div className="post__icon">
        <ProfilePicture
          src="./img/default-user.jpg"
          handleClick={() => history.push('/bio')}
        />
        <div className="post__vote">
          <Vote />
        </div>
      </div>
      <div
        className="post__content"
        onClick={() => history.push('/discussion')}>
        <h2>Lorem Ipsum Sir Dolor Amet</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam. Lorem ipsum dolor...<span> See more</span>
        </p>
        <img
          src="https://firebasestorage.googleapis.com/v0/b/diskus-app.appspot.com/o/discussion_home_1612711183036.png?alt=media&token=4fd06113-eb9b-499b-ab17-d515186c5343"
          alt="Post"
        />
        <div className="post__categories">
          <Category />
          <Category />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Post);
