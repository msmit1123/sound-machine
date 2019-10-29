import React from 'react';
import { PropTypes } from 'prop-types';

import './Keypad.scss';

import KeypadColumn from '../KeypadColumn/KeypadColumn.js';

const MAX_COLUMNS = 9;

function Keypad({ columnArray, ...props }) {
  return (
    <div className='keypad'>
      {/* render all columns */}
      {columnArray.map((item, index) => (
        <KeypadColumn
          columnIndex={index}
          key={'column-' + index}
          buttonArray={item}
          {...props}
        />
      ))}

      {/* when in settins mode, render a new placeholder column */}
      {props.isSettingsMode && columnArray.length < MAX_COLUMNS && (
        <KeypadColumn
          columnIndex='addNewColumn'
          key={'column-' + columnArray.length}
          buttonArray={[]}
          {...props}
        />
      )}
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
