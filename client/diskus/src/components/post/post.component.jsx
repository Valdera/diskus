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
        <img src="./img/test-image.jpg" alt="Post" />
        <div className="post__categories">
          <Category />
          <Category />
        </div>
      </div>
    </div>
  );
};

export default withRouter(Post);
