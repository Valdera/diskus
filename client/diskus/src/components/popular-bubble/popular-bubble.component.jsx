import React from 'react';
import './popular-bubble.styles.scss';

const PopularBubble = () => {
  return (
    <div className="popular-bubble">
      <div className="popular-bubble__image">
        <i className="fas fa-laptop-code"></i>
      </div>
      <div className="popular-bubble__content">
        <h4>Iphone XS keluar tahun ini</h4>
        <div className="popular-bubble__desc">
          <i className="fas fa-calendar-alt"></i>
          <p className="popular-bubble__text">16 Januari 2021</p>
          <i className="fas fa-vote-yea"></i>
          <p className="popular-bubble__text">21 Upvote</p>
          <i className="fas fa-comments"></i>
          <p className="popular-bubble__text">31 Comments</p>
        </div>
      </div>
    </div>
  );
};

export default PopularBubble;
