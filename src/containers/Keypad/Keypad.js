import React from 'react';

import './Keypad.scss';

import KeypadColumn from '../KeypadColumn/KeypadColumn.js';

function Keypad(props) {
  return (
    <div className='keypad'>
      <KeypadColumn />
      <KeypadColumn />
      <KeypadColumn />
    </div>
  );
}

export default Keypad;
