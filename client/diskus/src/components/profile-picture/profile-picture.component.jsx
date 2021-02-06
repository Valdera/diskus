import React from 'react';
import './profile-picture.styles.scss';

const ProfilePicture = ({
  src,
  handleClick,
  type = 'small',
  ...otherProps
}) => {
  return (
    <img
      className={`profile-picture ${type ? 'profile-picture--' + type : ''}`}
      onClick={handleClick}
      src={src}
      alt="User"
      {...otherProps}
    />
  );
};

export default ProfilePicture;
