import React from 'react';

import './KeypadColumn.scss';

import Button from '../../components/Button/Button.js';

const colArr = [
  {
    pressKey: '1',
    title: 'chord 1',
    id: '',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  },
  {
    pressKey: 'q',
    title: 'chord 2',
    id: '',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  },
  {
    pressKey: 'a',
    title: 'chord 3',
    id: '',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  },
  {
    pressKey: 'z',
    title: 'chord 1',
    id: '',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
];

function KeypadColumn(props) {
  function handleButtons(event) {
    const target = event.target;
    const sound = target.getElementsByTagName('audio')[0];
    sound.currentTime = 0;
    sound.play();
  }

  return (
    <div className='keypad__column'>
      {colArr.map((item, index) => (
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
