import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/auth.selector';
import { createStructuredSelector } from 'reselect';
import { voteStart } from '../../redux/discussion/discussion.actions';

import './vote.styles.scss';

const Vote = ({ item, type, currentUser, voteStart, clickable = true }) => {
  const [voteCount, setVoteCount] = useState('');
  const [dict, setDict] = useState('');

  useEffect(() => {
    setDict(item);
    setVoteCount(item.vote);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = async (vote) => {
    if (clickable && currentUser) {
      await voteStart({
        id: item.id,
        type,
        vote
      });
      let doc = dict;

      if (!dict.upvote.includes(currentUser.id) && vote === 'upvote') {
        if (dict.downvote.includes(currentUser.id)) {
          doc.downvote.pop(currentUser.id);
          doc.upvote.push(currentUser.id);
          setVoteCount(doc.upvote.length - doc.downvote.length);
        } else {
          doc.upvote.push(currentUser.id);
          setVoteCount(doc.upvote.length - doc.downvote.length);
        }
      }

      if (!dict.downvote.includes(currentUser.id) && vote === 'downvote') {
        if (dict.upvote.includes(currentUser.id)) {
          doc.upvote.pop(currentUser.id);
          doc.downvote.push(currentUser.id);
          setVoteCount(doc.upvote.length - doc.downvote.length);
        } else {
          doc.downvote.push(currentUser.id);
          setVoteCount(doc.upvote.length - doc.downvote.length);
        }
      }
      console.log(dict.upvote);
      console.log(dict.downvote);
      setDict(doc);
    }
  };

  return (
    <div className="vote">
      <i
        className={`fas fa-sort-up ${
          currentUser && dict && dict.upvote.includes(currentUser.id)
            ? 'vote--active'
            : ''
        } vote__arr vote--up  ${clickable ? 'vote--click' : ''}`}
        onClick={() => handleClick('upvote')}></i>
      <span className="vote__number">{voteCount}</span>
      <i
        className={`fas fa-sort-down ${
          currentUser && dict && dict.downvote.includes(currentUser.id)
            ? 'vote--active'
            : ''
        } vote--down  vote__arr  ${clickable ? 'vote--click' : ''}`}
        onClick={() => handleClick('downvote')}></i>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  voteStart: (payload) => dispatch(voteStart(payload))
});

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
