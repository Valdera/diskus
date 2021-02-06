import React from 'react';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';
import Vote from '../../components/vote/vote.component';
import './comment.styles.scss';

const Comment = () => {
  return (
    <div className="comment">
      <div className="comment__vote">
        <Vote />
      </div>
      <div className="comment__picture">
        <ProfilePicture src="./img/default-user.jpg" />
      </div>
      <div className="comment__content">
        <p className="comment__date">Commented 3 days ago by Valdera</p>
        <p className="comment__text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam. Lorem ipsum dolor
        </p>
      </div>
    </div>
  );
};

export default Comment;
