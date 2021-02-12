import React, { useState } from 'react';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';
import { connect } from 'react-redux';

import { ReactComponent as StreakSvg } from '../../assets/streak-svg.svg';
import { updateMeStart } from '../../redux/auth/auth.actions';

import './biodata.styles.scss';

const Biodata = ({ user, updateMeStart }) => {
  const [editBio, setEditBio] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [description, setDescription] = useState(user.description);
  const [file, setFile] = useState('');

  const handleUpdate = async (evt) => {
    evt.preventDefault();
    const formdata = new FormData();
    const data = {};

    if (file) {
      formdata.append('file', file);
      data.image = formdata;
    }

    data.data = {
      name,
      email,
      description
    };

    if (name || email || description || file) {
      await updateMeStart(data);
    }
    setEditBio(false);
  };

  return (
    <div className="biodata">
      <div className="biodata__streak">
        <div className="biodata__streak-svg">
          <StreakSvg />
        </div>
        <div className="biodata__streak-text">
          <h3>ACTIVE STREAK</h3>
          <h2>{user.streak}</h2>
        </div>
      </div>
      <form className="biodata__content" onSubmit={handleUpdate}>
        <div className="biodata__head">
          {editBio ? (
            file ? (
              <ProfilePicture src={URL.createObjectURL(file)} type="medium" />
            ) : (
              <ProfilePicture src={user.image} type="medium" />
            )
          ) : (
            <ProfilePicture src={user.image} type="medium" />
          )}

          <h2>BIODATA</h2>
          {editBio ? (
            <div class="biodata__head--input">
              <button>Change Image</button>
              <input
                type="file"
                onChange={(evt) => {
                  setFile(evt.target.files[0]);
                }}
              />
            </div>
          ) : (
            ''
          )}
        </div>
        <div className="biodata__edit">
          <i className="fas fa-edit" onClick={() => setEditBio(!editBio)}></i>
        </div>
        <div className="biodata__list">
          <p className="biodata__field">Name :</p>
          {editBio ? (
            <input
              className="biodata__input"
              placeholder={user.name}
              value={name}
              onChange={(evt) => setName(evt.target.value)}
            />
          ) : (
            <p className="biodata__fill">{user.name}</p>
          )}
        </div>
        <div className="biodata__list">
          <p className="biodata__field">Email :</p>
          {editBio ? (
            <input
              className="biodata__input"
              placeholder={user.email}
              type="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
            />
          ) : (
            <p className="biodata__fill">{user.email}</p>
          )}
        </div>
        <div className="biodata__list">
          <p className="biodata__field">Description :</p>
          {editBio ? (
            <textarea
              value={description}
              onChange={(evt) => setDescription(evt.target.value)}
            />
          ) : (
            <p className="biodata__fill">{user.description}</p>
          )}
          {editBio ? <button type="submit">Save</button> : ''}
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  updateMeStart: (payload) => dispatch(updateMeStart(payload))
});

export default connect(null, mapDispatchToProps)(Biodata);
