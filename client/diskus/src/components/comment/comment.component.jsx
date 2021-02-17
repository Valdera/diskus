import React from 'react';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import Vote from '../../components/vote/vote.component';
import { convertDate } from '../../utils/convertDate';
import './comment.styles.scss';
import { deleteCommentStart } from '../../redux/comment/comment.actions';
import { selectCurrentUser } from '../../redux/auth/auth.selector';

const Comment = ({ comment, history, currentUser, deleteCommentStart }) => {
  const deleteComment = async () => {
    await deleteCommentStart({
      id: comment.id,
      discussion: comment.discussion
    });
  };
  return (
    <div className="comment">
      <div className="comment__vote">
        <Vote item={comment} type="comments" />
        {currentUser ? (
          currentUser.id === comment.user.id ? (
            <i
              className="fas fa-trash-alt comment__delete"
              onClick={() => deleteComment()}></i>
          ) : (
            ''
          )
        ) : (
          ''
        )}
      </div>
      <div className="comment__picture">
        <ProfilePicture
          src={comment.user.image}
          handleClick={() => history.push(`/bio/${comment.user.id}`)}
        />
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
        {comment.sentiment > 0.5 ? (
          <i style={{ color: '#08F48C' }} className="fas fa-smile"></i>
        ) : (
          ''
        )}
        {comment.sentiment < -0.5 ? (
          <i style={{ color: '#E11820' }} className="fas fa-frown"></i>
        ) : (
          ''
        )}
        {comment.sentiment > -0.5 && comment.sentiment < 0.5 ? (
          <i style={{ color: '#A4A7AB' }} className="fas fa-meh"></i>
        ) : (
          ''
        )}

        <span>{Math.round(comment.sentiment * 100) / 100}</span>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteCommentStart: (payload) => dispatch(deleteCommentStart(payload))
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Comment)
);
