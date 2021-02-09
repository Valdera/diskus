import React from 'react';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';
import RadiusButton from '../../components/radius-button/radius-button.component';
import Post from '../../components/post/post.component';
import './biopage.styles.scss';

const BioPage = () => {
  return (
    <div className="biopage">
      <div className="biopage__content">
        <div className="biopage__picture">
          <ProfilePicture src="./img/default-user.jpg" type="large" />
          <RadiusButton custom="orange-small">Follow</RadiusButton>
        </div>
        <div className="biopage__text">
          <h1>Fauzan Valdera</h1>
          <span>Last active 1 days ago</span>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua. Ut enim ad minim veniam.
          </p>
        </div>
      </div>
      <h2 className="biopage__title">Fauzan Valdera's Post</h2>
      <div className="biopage__post">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  );
};

export default BioPage;
