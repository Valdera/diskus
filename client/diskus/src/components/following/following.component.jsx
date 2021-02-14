import React from 'react';
import ProfilePicture from '../../components/profile-picture/profile-picture.component';
import { withRouter } from 'react-router-dom';

import './following.styles.scss';

const Following = ({ user, history }) => {
  return (
    <div className="following">
      <ProfilePicture
        src={user.image}
        type="small-nohover"
        handleClick={() => history.push(`/bio/${user.id}`)}
      />
      <div className="following__name">{user.name.substring(0, 18)}</div>
    </div>
  );
};

export default withRouter(Following);
