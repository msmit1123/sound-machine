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
import Button from '../../components/Button/Button.js';
import Slider from '../../components/Slider/Slider.js';

import { formatMilliseconds } from '../../helperFunctions.js';
import {
  blankSoundLibrary,
  blankLoopLength,
  blankSoundLoop,
  demo1SoundLibrary,
  demo1LoopLength,
  demo1SoundLoop,
  demo2SoundLibrary,
  demo2LoopLength,
  demo2SoundLoop
} from '../../initialSoundLibrary';

const MAX_LENGTH = 10000;

function Controlpad(props) {
  return (
    <div className='controls'>
      {/* display main push button controls */}
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

      {/* in settings mode, allow user to change loop length
          otherwise, display loop length and curretn time */}
      <div className='controls__module'>
        <div className='controls__display'>
          <span className='left'>
            {props.isSettingsMode
              ? 'Set loop length in ms:'
              : formatMilliseconds(props.loopTime)}
          </span>
          {props.isSettingsMode ? '' : <span>/</span>}
          <span className='right'>
            {props.isSettingsMode && (
              <input
                className='controls__input'
                value={props.loopLength}
                onChange={props.changeLoopLength}
              />
            )}
            {!props.isSettingsMode && formatMilliseconds(props.loopLength)}
          </span>
        </div>
        <Slider
          id='play-slider'
          min={0}
          max={props.isSettingsMode ? MAX_LENGTH : props.loopLength}
          value={props.isSettingsMode ? props.loopLength : props.loopTime}
          onChange={
            props.isSettingsMode ? props.changeLoopLength : props.changeTime
          }
        >
          <FontAwesomeIcon icon={faPlay} />
        </Slider>
      </div>

      {/* volume and display */}
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

      {/* Machine Label */}
      <div className='controls__module'>
        <h1>DAS SOUND MACHINE</h1>
      </div>

      {/* Track selector (future feature). in settings mode, this is file management control module */}
      {props.isSettingsMode ? (
        <div className='controls__module controls__module--large'>
          <Button className='controls__button'>Save</Button>
          <Button className='controls__button'>Load</Button>
          <Button
            className='controls__button'
            onClick={() =>
              props.setSoundLibrary(
                demo1LoopLength,
                demo1SoundLibrary,
                demo1SoundLoop
              )
            }
          >
            Demo 1
          </Button>
          <Button
            className='controls__button'
            onClick={() =>
              props.setSoundLibrary(
                demo2LoopLength,
                demo2SoundLibrary,
                demo2SoundLoop
              )
            }
          >
            Demo 2
          </Button>
          <Button
            className='controls__button controls__button--warning'
            onClick={() => props.setSoundLibrary(false, false, blankSoundLoop)}
          >
            Clear Track
          </Button>
          <Button
            className='controls__button controls__button--warning'
            onClick={() =>
              props.setSoundLibrary(
                blankLoopLength,
                blankSoundLibrary,
                blankSoundLoop
              )
            }
          >
            Clear All
          </Button>
        </div>
      ) : (
        <div className='controls__module controls__module--large'>
          {/* Future Track Selector Feature */}
        </div>
      )}
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
  loopTime: PropTypes.number,
  changeTime: PropTypes.func,
  loopLength: PropTypes.number,
  changeLoopLength: PropTypes.func,
  //
  setSoundLibrary: PropTypes.func,
  //
  display: PropTypes.string,
  //
  currentVolume: PropTypes.number,
  changeVolume: PropTypes.func
};

export default Controlpad;
