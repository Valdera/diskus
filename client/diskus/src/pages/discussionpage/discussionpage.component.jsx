import React from 'react';
import Discussion from '../../components/discussion/discussion.component';
import Comment from '../../components/comment/comment.component';
import './discussionpage.styles.scss';

const DiscussionPage = () => {
  return (
    <div className="discussionpage">
      <div className="discussionpage__discussion">
        <Discussion />
      </div>
      <div className="discussionpage__comment">
        <h3>Comment</h3>
        <Comment />
      </div>
    </div>
  );
};

export default DiscussionPage;
