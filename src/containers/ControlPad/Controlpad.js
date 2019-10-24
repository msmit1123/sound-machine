import React from 'react';

import './Controlpad.scss';

function Controlpad(props) {
  return (
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
  );
}

export default Controlpad;
