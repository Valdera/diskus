import React, { useEffect, useState } from 'react';
import Discussion from '../../components/discussion/discussion.component';
import Comment from '../../components/comment/comment.component';
import { getDiscussionById } from '../../api/discussion.request';
import './discussionpage.styles.scss';
import Spinner from '../../components/spinner/spinner.component';

const DiscussionPage = ({ match }) => {
  const [discussion, setDiscussion] = useState(null);

  useEffect(() => {
    async function fetchDiscussion() {
      const discussion = await getDiscussionById(match.params.id);
      setDiscussion(discussion);
      console.log(discussion);
    }
    fetchDiscussion();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="discussionpage">
      {discussion ? (
        <div className="discussionpage__discussion">
          <Discussion discussion={discussion} />
        </div>
      ) : (
        <div className="discussionpage__spinner">
          <Spinner />
        </div>
      )}
      {discussion ? (
        <div className="discussionpage__comment">
          <h3>Comment</h3>
          {discussion.comments.map((comment) => (
            <Comment comment={comment} />
          ))}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default DiscussionPage;
