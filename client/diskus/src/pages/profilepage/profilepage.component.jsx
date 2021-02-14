import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { selectCurrentUser } from '../../redux/auth/auth.selector';
import { createStructuredSelector } from 'reselect';
import PopularBubble from '../../components/popular-bubble/popular-bubble.component';
import Biodata from '../../components/biodata/biodata.component';
import Submit from '../../components/submit/submit.component';
import Following from '../../components/following/following.component';
import Post from '../../components/post/post.component';
import './profilepage.styles.scss';
import { getPopular } from '../../api/discussion.request';
import Spinner from '../../components/spinner/spinner.component';
import { getMeStart } from '../../redux/auth/auth.actions';

const ProfilePage = ({ currentUser, getMeStart }) => {
  const [popular, setPopular] = useState([]);

  const fetchPopular = async () => {
    const discussions = await getPopular();
    setPopular(discussions);
  };

  const getMe = async () => {
    await getMeStart();
  };

  useEffect(() => {
    getMe();
    fetchPopular();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="profilepage">
      <div className="profilepage__welcome">
        <div className="profilepage__welcome-text">
          <h1 className="profilepage__welcome-title">Welcome Back,</h1>
          <h1 className="profilepage__welcome-name">
            {currentUser.name.substring(0, 15)}
          </h1>
          <p className="profilepage__welcome-popular">Popular Post : </p>
        </div>
        {popular.length > 0 ? (
          popular.map((discussion) => (
            <PopularBubble key={discussion.id} discussion={discussion} />
          ))
        ) : (
          <div className="profilepage__welcome--spinner">
            <Spinner />
          </div>
        )}
      </div>

      <div className="profilepage__biodata">
        <Biodata user={currentUser} />
      </div>

      <div className="profilepage__submit">
        <Submit user={currentUser} />
      </div>

      <div className="profilepage__following">
        <h1>Your Following</h1>
        <div className="profilepage__following-list">
          {currentUser.followingDetail.map((user) => (
            <Following user={user} key={user._id} />
          ))}
        </div>
      </div>

      <div className="profilepage__post">
        <h1>Your Post</h1>
        <div className="profilepage__post-list">
          {currentUser.discussions
            .sort((a, b) => (a.createdDate < b.createdDate ? 1 : -1))
            .map((discussion) => (
              <Post
                discussion={discussion}
                key={discussion.id}
                clickableVote={false}
                trash={true}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = (dispatch) => ({
  getMeStart: () => dispatch(getMeStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
