import React from 'react';
import Vote from '../../components/vote/vote.component';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';
import Category from '../../components/category/category.component';
import { convertDate } from '../../utils/convertDate';
import './discussion.styles.scss';

const Discussion = ({ discussion, history }) => {
  return (
    <div className="discussion">
      <div className="discussion__header">
        <Vote item={discussion} type="discussions" />
        <div className="discusson__profile">
          <ProfilePicture
            src={discussion.user.image}
            type="discuss"
            handleClick={() => history.push(`/bio/${discussion.user.id}`)}
          />
        </div>
        <h2>{discussion.title}</h2>
      </div>

      <div className="discussion__content">
        <p>{discussion.text}</p>
        {discussion.image ? <img src={discussion.image} alt="Post" /> : ''}

        <div className="discussion__categories">
          {discussion.categories.map((item) => (
            <Category key={item}>{item}</Category>
          ))}
        </div>

        <span className="discussion__date">
          {`Posted on ${convertDate(discussion.createdDate)} by ${
            discussion.user.name
          }`}
        </span>
      </div>
    </div>
  );
};

export default Discussion;
