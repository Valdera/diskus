import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

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

const DiscussionPage = ({ match, selectedDiscussion, getDiscussionStart }) => {
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
          <Discussion discussion={selectedDiscussion} />
        </div>
      ) : (
        <div className="discussionpage__spinner">
          <Spinner />
        </div>
      )}
      {selectedDiscussion ? (
        <div className="discussionpage__comment">
          <h3>Comment</h3>
          <CommentSubmit discussion={selectedDiscussion.id} />
          {selectedDiscussion.comments.map((comment) => (
            <Comment comment={comment} />
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
  isLoaded: selectDiscussionsLoaded
});

export default connect(mapStateToProps, mapDispatchToProps)(DiscussionPage);
