import React from 'react';
import { PropTypes } from 'prop-types';
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
        <ToggleSwitch
          id='play'
          className='controls__toggle-flat-button'
          checked={props.isPlaying}
          onChange={props.togglePlay}
        >
          <span>
            <FontAwesomeIcon icon={faPlayCircle} />
          </span>
        </ToggleSwitch>
        <ToggleSwitch
          id='record'
          className='controls__toggle-push-button'
          checked={props.isRecording}
          onChange={props.toggleRecord}
        >
          <span>
            <FontAwesomeIcon icon={faMicrophoneAlt} />
          </span>
        </ToggleSwitch>
        <ToggleSwitch
          id='settings'
          className='controls__toggle-push-button'
          checked={props.isSettingsMode}
          onChange={props.toggleSettings}
        >
          <span>
            <FontAwesomeIcon icon={faCog} />
          </span>
        </ToggleSwitch>
        <ToggleSwitch
          id='power'
          className='controls__toggle-push-button'
          checked={props.isOn}
          onChange={props.togglePower}
        >
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
          <FontAwesomeIcon icon={faPlay} />
        </Slider>
      </div>
      <div className='controls__module'>
        <div className='controls__display'>{props.display}</div>
        <Slider
          id='volume-slider'
          min={0}
          max={100}
          value={props.currentVolume}
          onChange={props.changeVolume}
        >
          <FontAwesomeIcon icon={faVolumeUp} />
        </Slider>
      </div>
      <div className='controls__module'>
        <h1>DAS SOUND MACHINE</h1>
      </div>
    </div>
  );
}

Controlpad.propTypes = {
  isPlaying: PropTypes.bool,
  togglePlay: PropTypes.func,
  //
  isRecording: PropTypes.bool,
  toggleRecord: PropTypes.func,
  //
  isSettingsMode: PropTypes.bool,
  toggleSettings: PropTypes.func,
  //
  isOn: PropTypes.bool,
  togglePower: PropTypes.func,
  //
  display: PropTypes.string,
  //
  currentVolume: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
  changeVolume: PropTypes.func
};

export default Controlpad;
