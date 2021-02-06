import React from 'react';
import './vote.styles.scss';

const Vote = () => {
  return (
    <div className="vote">
      <i className="fas fa-sort-up vote--up"></i>
      <span className="vote__number">13</span>
      <i className="fas fa-sort-down vote--down"></i>
    </div>
  );
};

export default Vote;
