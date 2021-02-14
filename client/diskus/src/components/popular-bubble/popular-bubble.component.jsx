import React from 'react';
import './popular-bubble.styles.scss';
import { withRouter } from 'react-router-dom';
import { convertDate } from '../../utils/convertDate';

const PopularBubble = ({ discussion, history }) => {
  return (
    <div
      className="popular-bubble"
      onClick={() => history.push(`/discussion/${discussion.id}`)}>
      <div className="popular-bubble__image">
        <i className="fas fa-laptop-code"></i>
      </div>
      <div className="popular-bubble__content">
        <h4>{discussion.title.substring(0, 20)}</h4>
        <div className="popular-bubble__desc">
          <i className="fas fa-calendar-alt"></i>
          <p className="popular-bubble__text">
            {convertDate(discussion.createdDate)}
          </p>
          <i className="fas fa-vote-yea"></i>
          <p className="popular-bubble__text">{`${discussion.vote} Vote`}</p>
          <i className="fas fa-comments"></i>
          <p className="popular-bubble__text">{`${discussion.comments.length} Comments`}</p>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PopularBubble);
