import React from 'react';
import { PropTypes } from 'prop-types';

import './KeypadColumn.scss';

import Button from '../../components/Button/Button.js';

function KeypadColumn(props) {
  return (
    <div className='keypad__column'>
      {props.buttonArray.map((item, index) => (
        <Button
          className='keypad__button'
          key={'key-' + item.pressKey + '-' + index}
          id={item.pressKey}
          title={item.title}
          onClick={props.playSound}
        >
          <audio src={item.url} />
          {item.pressKey}
        </Button>
      ))}
    </div>
  );
}

KeypadColumn.propTypes = {
  buttonArray: PropTypes.array,
  playSound: PropTypes.func
};

export default KeypadColumn;
