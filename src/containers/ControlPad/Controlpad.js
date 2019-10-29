import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlayCircle,
  faPlay,
  faCog,
  faMicrophoneAlt,
  faPowerOff,
  faVolumeUp
} from '@fortawesome/free-solid-svg-icons';

import './Controlpad.scss';

import ToggleSwitch from '../../components/ToggleSwitch/ToggleSwitch.js';
import Slider from '../../components/Slider/Slider.js';

function Controlpad(props) {
  return (
    <div className='controls'>
      <div className='controls__module'>
        <ToggleSwitch id='play' className='controls__toggle-flat-button'>
          <span>
            <FontAwesomeIcon icon={faPlayCircle} />
          </span>
        </ToggleSwitch>
        <ToggleSwitch id='record' className='controls__toggle-push-button'>
          <span>
            <FontAwesomeIcon icon={faMicrophoneAlt} />
          </span>
        </ToggleSwitch>
        <ToggleSwitch id='settings' className='controls__toggle-push-button'>
          <span>
            <FontAwesomeIcon icon={faCog} />
          </span>
        </ToggleSwitch>
        <ToggleSwitch id='power' className='controls__toggle-push-button'>
          <span>
            <FontAwesomeIcon icon={faPowerOff} />
          </span>
        </ToggleSwitch>
      </div>
      <div className='controls__module'>
        <div className='controls__display'>
          <span className='left'>current</span>{' '}
          <span className='right'>/max</span>
        </div>
        <Slider>
          {/** <input type="range" min="1" max="100" value="50" class="slider" id="myRange"> */}
          <FontAwesomeIcon icon={faPlay} />
        </Slider>
      </div>
      <div className='controls__module'>
        <div className='controls__display'>{props.display}</div>
        <Slider>
          <FontAwesomeIcon icon={faVolumeUp} />
        </Slider>
      </div>
      <div className='controls__module'>
        <h1>DAS SOUND MACHINE</h1>
      </div>
    </div>
  );
}

export default Controlpad;
