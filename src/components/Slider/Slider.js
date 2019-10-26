import React from 'react';
import { PropTypes } from 'prop-types';

import './Slider.scss';

function Slider({ children, ...props }) {
  return (
    <div className='controls__slider-label-container'>
      <div className='controls__slider-label'>{children}</div>
      <div className='controls__slider'>
        <input type='range' {...props}></input>
      </div>
    </div>
  );
}

Slider.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired
};

export default Slider;
