import React from 'react';

import RadiusButton from '../../components/radius-button/radius-button.component';
import StyledSelectDrop from '../styled-select/styled-select.component';
import './submit.styles.scss';

const Submit = () => {
  return (
    <div className="submit">
      <h1>Submit a Post</h1>
      <div className="submit__input">
        <p>Title :</p>
        <input className="submit__input-text" type="text" />
      </div>
      <div className="submit__input">
        <p>Type :</p>
        <StyledSelectDrop />
      </div>
      <div className="submit__input">
        <p>Main Text :</p>
        <textarea></textarea>
      </div>
      <div className="submit__button">
        <RadiusButton type="green">Add Image</RadiusButton>
        <RadiusButton type="flip-orange">Submit</RadiusButton>
      </div>
    </div>
  );
};

export default Submit;
