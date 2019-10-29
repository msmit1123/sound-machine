import React from 'react';

import './Keypad.scss';

import KeypadColumn from '../KeypadColumn/KeypadColumn.js';

function Keypad({ columnArray, ...props }) {
  return (
    <div className='keypad'>
      {columnArray.map((item, index) => (
        <KeypadColumn key={'column-' + index} buttonArray={item} {...props} />
      ))}
    </div>
  );
}

export default Keypad;
