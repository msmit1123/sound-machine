import React from 'react';

import './Controlpad.scss';

import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch.js';

function Controlpad(props) {
  return (
    <div className='controls'>
      <div className='controls__module'>
        <ToggleSwitch id='power' className='toggle-switch-type-B'>
          <span>O</span>
        </ToggleSwitch>
        <ToggleSwitch id='settings' className='toggle-switch-type-B'>
          <span>G</span>
        </ToggleSwitch>
      </div>
      <div className='controls__module'>
        <div>current time / max time</div>
        <div>current time slider</div>
      </div>
      <div className='controls__module'>
        <ToggleSwitch id='record' className='toggle-switch-type-B'>
          <span>R</span>
        </ToggleSwitch>
        <ToggleSwitch id='play' className='toggle-switch-type-B'>
          <span>P</span>
        </ToggleSwitch>
      </div>
      <div className='controls__module'>
        <div>volume slider</div>
        <div>now playing</div>
      </div>
    </div>
  );
}

export default Controlpad;
