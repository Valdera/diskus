import React from 'react';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';

import './following.styles.scss';

const Following = ({ user }) => {
  return (
    <div className="following">
      <ProfilePicture src={user.image} type="small-nohover" />
      <div className="following__name">{user.name.substring(0, 18)}</div>
    </div>
  );
};

export default Following;
