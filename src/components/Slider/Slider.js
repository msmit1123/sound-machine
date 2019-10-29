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
  onChange: PropTypes.func.isRequired,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default Slider;
