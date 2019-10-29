import React from 'react';
import { PropTypes } from 'prop-types';

import './FormOverlay.scss';

function FormOverlay(props) {
  return (
    <div className='form__overlay' onClick={props.closeEditButtonOverlay}>
      <div className='form__body'>Edit Button Properties</div>
      {props.children}
    </div>
  );
}

FormOverlay.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,

  className: PropTypes.string,
  id: PropTypes.string
};

export default FormOverlay;
