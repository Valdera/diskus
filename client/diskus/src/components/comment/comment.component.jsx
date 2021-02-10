import React from 'react';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';
import Vote from '../../components/vote/vote.component';
import './comment.styles.scss';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment__vote">
        <Vote item={comment} />
      </div>
      <div className="comment__picture">
        <ProfilePicture src={comment.user.image} />
      </div>
      <div className="comment__content">
        <p className="comment__date">{`Commented 3 days ago by ${comment.user.name}`}</p>
        <p className="comment__text">{comment.text}</p>
      </div>
    </div>
  );
};

export default Comment;
