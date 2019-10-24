import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faCog,
  faMicrophoneAlt,
  faPowerOff
} from '@fortawesome/free-solid-svg-icons';

import './Controlpad.scss';

import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch.js';

function Controlpad(props) {
  return (
    <div className='controls'>
      <div className='controls__module'>
        <ToggleSwitch id='play' className='toggle-switch-type-C'>
          <span>
            <FontAwesomeIcon icon={faPlayCircle} />
          </span>
        </ToggleSwitch>
        <ToggleSwitch id='record' className='toggle-switch-type-B'>
          <span>
            <FontAwesomeIcon icon={faMicrophoneAlt} />
          </span>
        </ToggleSwitch>
        <ToggleSwitch id='settings' className='toggle-switch-type-B'>
          <span>
            <FontAwesomeIcon icon={faCog} />
          </span>
        </ToggleSwitch>
        <ToggleSwitch id='power' className='toggle-switch-type-B'>
          <span>
            <FontAwesomeIcon icon={faPowerOff} />
          </span>
        </ToggleSwitch>
      </div>
      <div className='controls__module'>
        <div>current time / max time</div>
        <div>current time slider</div>
      </div>
      <div className='controls__module'>
        <div>volume slider</div>
        <div>now playing</div>
      </div>
    </div>
  );
}

export default Controlpad;
