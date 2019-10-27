import React from 'react';

import './Keypad.scss';

import KeypadColumn from '../KeypadColumn/KeypadColumn.js';

function Keypad(props) {
  return (
    <div className='keypad'>
      {props.columnArray.map((item, index) => (
        <KeypadColumn key={'column-' + index} buttonArray={item} />
      ))}
    </div>
  );
}

export default Keypad;
