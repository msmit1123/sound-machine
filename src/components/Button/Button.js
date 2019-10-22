import React from 'react';
import { PropTypes } from 'prop-types';

import './Button.scss';

function Button({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired
};

export default Button;
