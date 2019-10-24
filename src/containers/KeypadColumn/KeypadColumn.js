import React from 'react';

import './KeypadColumn.scss';

import Button from '../../components/Button/Button.js';

function KeypadColumn(props) {
  return (
    <div className='keypad__column'>
      <Button className='keypad__button' />
      <Button className='keypad__button' />
      <Button className='keypad__button' />
    </div>
  );
}

export default KeypadColumn;
