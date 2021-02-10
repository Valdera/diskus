import React from 'react';
import './vote.styles.scss';

const Vote = ({ item, type }) => {
  return (
    <div className="vote">
      <i className="fas fa-sort-up vote--up"></i>
      <span className="vote__number">{item.vote}</span>
      <i className="fas fa-sort-down vote--down"></i>
    </div>
  );
};

export default Vote;
