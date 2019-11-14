import React from 'react';
import { PropTypes } from 'prop-types';

import './AutoCompleteTextInput.scss';

function AutoCompleteTextInput(props) {
  return <div>{props.children}</div>;
}

AutoCompleteTextInput.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  onPointerDown: PropTypes.func,

  className: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string
};

export default AutoCompleteTextInput;
