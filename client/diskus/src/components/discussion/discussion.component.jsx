import React from 'react';
import Vote from '../../components/vote/vote.component';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';
import Category from '../../components/category/category.component';
import './discussion.styles.scss';

const Discussion = () => {
  return (
    <div className="discussion">
      <div className="discussion__header">
        <Vote />
        <div className="discusson__profile">
          <ProfilePicture src="./img/default-user.jpg" type="discuss" />
        </div>
        <h2>Lorem Ipsum Sir Dolor ?</h2>
      </div>
      <div className="discussion__content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam.
        </p>
        <img src="./img/test-image.jpg" alt="Post" />
        <div className="discussion__categories">
          <Category />
          <Category />
        </div>
        <span className="discussion__date">
          Posted 1 days ago by fauzan valdera
        </span>
      </div>
    </div>
  );
};

export default Discussion;
