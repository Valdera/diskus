import React from 'react';
import './radius-button.styles.scss';

const RadiusButton = ({ children, custom, ...otherProps }) => {
  return (
    <button
      className={`radius-button ${custom ? 'radius-button--' + custom : ''}`}
      {...otherProps}>
      {children}
    </button>
  );
};

export default RadiusButton;
