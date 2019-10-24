import React from 'react';

import './Controlpad.scss';

import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch.js';

function Controlpad(props) {
  return (
    <div className='controls'>
      <div className='controls__module'>
        <ToggleSwitch className='controls__toggle'>power</ToggleSwitch>
        {/* <div class="switchContainer" id="switch5Container">
              <h2>switch 5</h2>
              <input type="checkbox" id="switch5">
              <label class="switch5Toggle" for="switch5"><span>$</span></label>
            </div> */}

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
