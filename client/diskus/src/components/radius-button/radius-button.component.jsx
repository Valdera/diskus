import React from 'react';
import './radius-button.styles.scss';

const RadiusButton = ({ children, type, ...otherProps }) => {
  return (
    <button
      className={`radius-button ${type ? 'radius-button--' + type : ''}`}
      {...otherProps}>
      {children}
    </button>
  );
};

export default RadiusButton;
