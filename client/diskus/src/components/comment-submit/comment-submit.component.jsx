import React, { useState } from 'react';
import './comment-submit.styles.scss';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/auth.selector';
import { createCommentStart } from '../../redux/comment/comment.actions';
import { createStructuredSelector } from 'reselect';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';

const CommentSubmit = ({
  currentUser,
  createCommentStart,
  fetchDiscussion,
  discussion
}) => {
  const [text, setText] = useState('');

  const createComment = async () => {
    await createCommentStart({ text, discussion });
    await fetchDiscussion();
    setText('');
  };

  return (
    <div className="comment-submit">
      <ProfilePicture src={currentUser.image} type="discuss" />
      <textarea
        value={text}
        onChange={(evt) => setText(evt.target.value)}
        className="comment-submit__input"
      />
      <button className="comment-submit__button" onClick={createComment}>
        Submit
      </button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  createCommentStart: (payload) => dispatch(createCommentStart(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(CommentSubmit);
