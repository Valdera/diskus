import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import Discussion from '../../components/discussion/discussion.component';

import Comment from '../../components/comment/comment.component';
import './discussionpage.styles.scss';
import Spinner from '../../components/spinner/spinner.component';
import CommentSubmit from '../../components/comment-submit/comment-submit.component';
import { getDiscussionStart } from '../../redux/discussion/discussion.actions';
import {
  selectDiscussionsLoaded,
  selectSelectedDiscussion
} from '../../redux/discussion/discussion.selector';
import { selectCurrentUser } from '../../redux/auth/auth.selector';

const DiscussionPage = ({
  match,
  selectedDiscussion,
  getDiscussionStart,
  currentUser,
  history
}) => {
  const fetchDiscussion = async () => {
    await getDiscussionStart(match.params.id);
  };

  useEffect(() => {
    fetchDiscussion();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="discussionpage">
      {selectedDiscussion ? (
        <div className="discussionpage__discussion">
          <Discussion history={history} discussion={selectedDiscussion} />
        </div>
      ) : (
        <div className="discussionpage__spinner">
          <Spinner />
        </div>
      )}
      {selectedDiscussion ? (
        <div className="discussionpage__comment">
          <h3>Comment</h3>
          {currentUser ? (
            <CommentSubmit discussion={selectedDiscussion.id} />
          ) : (
            <div
              className="discussionpage__nologin"
              onClick={() => history.push('/login')}>
              Login first to comment and to vote on this discussion
            </div>
          )}
          {selectedDiscussion.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  getDiscussionStart: (payload) => dispatch(getDiscussionStart(payload))
});

const mapStateToProps = createStructuredSelector({
  selectedDiscussion: selectSelectedDiscussion,
  isLoaded: selectDiscussionsLoaded,
  currentUser: selectCurrentUser
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DiscussionPage)
);
