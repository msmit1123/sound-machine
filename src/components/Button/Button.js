import React from 'react';
import { PropTypes } from 'prop-types';

import './Button.scss';

function Button({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  onPointerDown: PropTypes.func,

  className: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string
};

export default Button;
