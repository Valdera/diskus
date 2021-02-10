import React from 'react';
import { withRouter } from 'react-router-dom';
import Category from '../category/category.component';
import ProfilePicture from '../profile-picture/profile-picture.component';
import Vote from '../vote/vote.component';

import './post.styles.scss';

const Post = ({ history, discussion }) => {
  return (
    <div className="post">
      <div className="post__icon">
        <ProfilePicture
          src={discussion.user.image}
          handleClick={() => history.push('/bio')}
        />
        <div className="post__vote">
          <Vote item={discussion} />
        </div>
      </div>
      <div
        className="post__content"
        onClick={() => history.push(`/discussion/${discussion.id}`)}>
        <h2>{discussion.title}</h2>
        <p>
          {discussion.text}
          {/* <span> See more</span> */}
        </p>

        {discussion.image ? <img src={discussion.image} alt="Post" /> : ''}

        <div className="post__categories">
          {discussion.categories.map((item) => (
            <Category key={item}>{item}</Category>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Post);
