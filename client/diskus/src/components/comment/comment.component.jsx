import React from 'react';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';
import Vote from '../../components/vote/vote.component';
import { convertDate } from '../../utils/convertDate';
import './comment.styles.scss';

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment__vote">
        <Vote item={comment} type="comments" />
      </div>
      <div className="comment__picture">
        <ProfilePicture src={comment.user.image} />
      </div>
      <div className="comment__content">
        <p className="comment__date">{`Commented on ${convertDate(
          comment.createdDate
        )} by ${comment.user.name}`}</p>
        <p className="comment__text">{comment.text}</p>
      </div>
      <div className="comment__sentiment">
        <p className="comment__sentiment--text">Sentiment</p>
        <p className="comment__sentiment--text">Analysis</p>
        {comment.sentiment > 1 ? (
          <i style={{ color: '#08F48C' }} className="fas fa-smile"></i>
        ) : (
          ''
        )}
        {comment.sentiment < -1 ? (
          <i style={{ color: '#E11820' }} className="fas fa-frown"></i>
        ) : (
          ''
        )}
        {comment.sentiment > -1 && comment.sentiment < 1 ? (
          <i style={{ color: '#A4A7AB' }} className="fas fa-meh"></i>
        ) : (
          ''
        )}

        <span>{comment.sentiment}</span>
      </div>
    </div>
  );
};

export default Comment;
