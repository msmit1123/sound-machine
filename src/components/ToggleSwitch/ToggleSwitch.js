import React from 'react';
import { PropTypes } from 'prop-types';

import './ToggleSwitch.scss';

function ToggleSwitch({ id, className, ...props }) {
  return (
    <div className={className}>
      <input type='checkbox' id={id} {...props} />
      <label className={`${className}__graphic`} htmlFor={id}></label>
    </div>
  );
}

ToggleSwitch.propTypes = {
  id: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ToggleSwitch;
