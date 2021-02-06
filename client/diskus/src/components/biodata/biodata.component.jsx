import React, { useState } from 'react';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';
import { ReactComponent as StreakSvg } from '../../assets/streak-svg.svg';

import './biodata.styles.scss';

const Biodata = () => {
  const [editBio, setEditBio] = useState(false);
  return (
    <div className="biodata">
      <div className="biodata__streak">
        <div className="biodata__streak-svg">
          <StreakSvg />
        </div>
        <div className="biodata__streak-text">
          <h3>ACTIVE STREAK</h3>
          <h2>13</h2>
        </div>
      </div>
      <div className="biodata__content">
        <div className="biodata__head">
          <ProfilePicture src="./img/default-user.jpg" type="medium" />
          <h2>BIODATA</h2>
        </div>
        <div className="biodata__edit">
          <i className="fas fa-edit" onClick={() => setEditBio(!editBio)}></i>
        </div>
        <div className="biodata__list">
          <p className="biodata__field">Name :</p>
          {editBio ? (
            <input className="biodata__input" placeholder="Fauzan Valdera" />
          ) : (
            <p className="biodata__fill">Fauzan Valdera</p>
          )}
        </div>
        <div className="biodata__list">
          <p className="biodata__field">Email :</p>
          <p className="biodata__fill">f.valdera@yahoo.co.id</p>
        </div>
        <div className="biodata__list">
          <p className="biodata__field">Description :</p>
          {editBio ? (
            <textarea>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enimf ad minim veniam.
            </textarea>
          ) : (
            <p className="biodata__fill">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enimf ad minim veniam.
            </p>
          )}
          {editBio ? <button>Save</button> : ''}
        </div>
      </div>
    </div>
  );
};

export default Biodata;
