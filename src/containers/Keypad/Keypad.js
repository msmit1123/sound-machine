import React from 'react';
import { PropTypes } from 'prop-types';

import './Keypad.scss';

import KeypadColumn from '../KeypadColumn/KeypadColumn.js';

function Keypad({ columnArray, ...props }) {
  return (
    <div className='keypad'>
      {columnArray.map((item, index) => (
        <KeypadColumn
          columnIndex={index}
          key={'column-' + index}
          buttonArray={item}
          {...props}
        />
      ))}
    </div>
  );
}

Keypad.propTypes = {
  columnArray: PropTypes.array,
  isSettingsMode: PropTypes.bool,
  playSound: PropTypes.func,
  editButton: PropTypes.func,
  addButton: PropTypes.func
};

export default Keypad;
