import React from 'react';
import { withRouter } from 'react-router-dom';
import Category from '../category/category.component';
import ProfilePicture from '../profile-picture/profile-picture.component';
import { deleteDiscussionStart } from '../../redux/discussion/discussion.actions';
import { connect } from 'react-redux';

import Vote from '../vote/vote.component';
import { convertDate } from '../../utils/convertDate';
import './post.styles.scss';

const Post = ({
  history,
  discussion,
  deleteDiscussionStart,
  clickableVote,
  trash = false
}) => {
  const deleteDiscussion = async () => {
    await deleteDiscussionStart(discussion.id);
  };

  return (
    <div className="post">
      <div className="post__icon">
        <ProfilePicture
          src={discussion.user.image}
          handleClick={() => history.push(`/bio/${discussion.user.id}`)}
        />
        <div className="post__vote">
          <Vote
            item={discussion}
            type="discussions"
            clickable={clickableVote}
          />
        </div>
        {discussion.comments ? (
          <div className="post__comment">
            <i className="fas fa-comments"></i>
            <span>{discussion.comments.length}</span>
          </div>
        ) : (
          ''
        )}
        {trash ? (
          <i
            class="fas fa-trash-alt post__delete"
            onClick={() => deleteDiscussion()}></i>
        ) : (
          ''
        )}
      </div>
      <div
        className="post__content"
        onClick={() => history.push(`/discussion/${discussion.id}`)}>
        <div>
          <h2>{discussion.title}</h2>
          <span>
            Posted on {convertDate(discussion.createdDate)} by{' '}
            {discussion.user.name}
          </span>
        </div>
        <p>{discussion.text}</p>

        {discussion.image ? <img src={discussion.image} alt="Post" /> : ''}

        <div className="post__categories">
          {discussion.categories.map((item) => (
            <Category key={item}>{item}</Category>
          ))}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  deleteDiscussionStart: (payload) => dispatch(deleteDiscussionStart(payload))
});

export default withRouter(connect(null, mapDispatchToProps)(Post));
