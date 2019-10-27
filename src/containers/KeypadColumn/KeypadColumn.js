import React from 'react';

import './KeypadColumn.scss';

import Button from '../../components/Button/Button.js';

function KeypadColumn(props) {
  function handleButtons(event) {
    const target = event.target;
    const sound = target.getElementsByTagName('audio')[0];
    sound.currentTime = 0;
    sound.play();
  }

  return (
    <div className='keypad__column'>
      {props.buttonArray.map((item, index) => (
        <Button
          className='keypad__button'
          id={item.pressKey}
          key={item.pressKey}
          onClick={handleButtons}
        >
          <audio src={item.url} />
          {item.pressKey}
        </Button>
      ))}
    </div>
  );
}

export default KeypadColumn;
