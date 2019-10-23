import React from 'react';

import './App.scss';

function App() {
  return (
    <div className='App'>
      <div className='sound-machine'>
        <div className='keypad'>
          <div className='keypad__column'>
            <div className='keypad__button'>q</div>
            <div className='keypad__button'>a</div>
            <div className='keypad__button'>z</div>
            <div className='keypad__button'>z</div>
            <div className='keypad__button'>z</div>
            <div className='keypad__button'>z</div>
            <div className='keypad__button'>z</div>

            <div className='keypad__button'>z</div>
          </div>
          <div className='keypad__column'>
            <div className='keypad__button'>q</div>
            <div className='keypad__button'>a</div>
            <div className='keypad__button'>z</div>
          </div>
          <div className='keypad__column'>
            <div className='keypad__button'>q</div>
            <div className='keypad__button'>a</div>
            <div className='keypad__button'>z</div>
          </div>
          <div className='keypad__column'>
            <div className='keypad__button'>q</div>
            <div className='keypad__button'>a</div>
            <div className='keypad__button'>z</div>
          </div>
          <div className='keypad__column'>
            <div className='keypad__button'>w</div>
            <div className='keypad__button'>s</div>
            <div className='keypad__button'>x</div>
          </div>
          <div className='keypad__column'>
            <div className='keypad__button'>e</div>
            <div className='keypad__button'>d</div>
            <div className='keypad__button'>c</div>
          </div>
        </div>
        <div className='controls'>
          <div className='controls__module'>
            <div className='controls__toggle'>power</div>
            <div className='controls__toggle'>settings</div>
          </div>
          <div className='controls__module'>
            <div>current time / max time</div>
            <div>current time slider</div>
          </div>
          <div className='controls__module'>
            <div className='controls__toggle'>record</div>
            <div className='controls__toggle'>play</div>
          </div>
          <div className='controls__module'>
            <div>volume slider</div>
            <div>now playing</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
