import React from 'react';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';

import './following.styles.scss';

const Following = () => {
  return (
    <div className="following">
      <ProfilePicture src="./img/default-user.jpg" type="small-nohover" />
      <div className="following__name">Fauzan Valdera</div>
    </div>
  );
};

export default Following;
