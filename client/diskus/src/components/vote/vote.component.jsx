import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/auth.selector';
import { createStructuredSelector } from 'reselect';
import { voteStart } from '../../redux/discussion/discussion.actions';

import './vote.styles.scss';

const Vote = ({ item, type, currentUser, voteStart, clickable = true }) => {
  const [voteCount, setVoteCount] = useState('');

  useEffect(() => {
    setVoteCount(item.vote);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = async (vote) => {
    if (clickable && currentUser) {
      await voteStart({
        id: item.id,
        type,
        vote
      });

      if (!item.upvote.includes(currentUser.id) && vote === 'upvote') {
        if (item.downvote.includes(currentUser.id)) {
          setVoteCount(voteCount + 2);
        } else {
          setVoteCount(voteCount + 1);
        }
      }

      if (!item.downvote.includes(currentUser.id) && vote === 'downvote') {
        if (item.upvote.includes(currentUser.id)) {
          setVoteCount(voteCount - 2);
        } else {
          setVoteCount(voteCount - 1);
        }
      }
    }
  };

  return (
    <div className="vote">
      <i
        className={`fas fa-sort-up vote--up ${clickable ? 'vote--click' : ''}`}
        onClick={() => handleClick('upvote')}></i>
      <span className="vote__number">{voteCount}</span>
      <i
        className={`fas fa-sort-down vote--down ${
          clickable ? 'vote--click' : ''
        }`}
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
