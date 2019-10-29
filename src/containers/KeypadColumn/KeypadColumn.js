import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import './KeypadColumn.scss';

import Button from '../../components/Button/Button.js';

const MAX_BUTTON_ROWS = 9;

function KeypadColumn(props) {
  return (
    <div className='keypad__column' column-index={props.columnIndex}>
      {/* render the rows of buttons */}
      {!props.isSettingsMode &&
        props.buttonArray.map((item, index) => (
          <Button
            className='keypad__button'
            key={'key-' + item.pressKey + '-' + index}
            id={item.pressKey}
            title={item.title}
            onClick={props.playSound}
            clipVolume={item.volume}
          >
            <audio src={item.url} />
            {item.pressKey}
          </Button>
        ))}

      {/* when in settings mode, show setting icons on buttons */}
      {props.isSettingsMode &&
        props.buttonArray.map((item, index) => (
          <Button
            className='keypad__button keypad__button--settings-mode'
            key={'key-' + item.pressKey + '-' + index}
            row-index={index}
            id={item.pressKey}
            onClick={props.editButton}
          >
            <FontAwesomeIcon icon={faCog} />
            {item.pressKey}
          </Button>
        ))}
      {/* and render an extra 'add' button */}
      {props.isSettingsMode && props.buttonArray.length < MAX_BUTTON_ROWS && (
        <Button
          className='keypad__button keypad__button--add'
          onClick={props.addButton}
        >
          +
        </Button>
      )}
    </div>
  );
}

KeypadColumn.propTypes = {
  isSettingsMode: PropTypes.bool.isRequired,
  columnIndex: PropTypes.number.isRequired,
  buttonArray: PropTypes.array,
  playSound: PropTypes.func,
  editButton: PropTypes.func,
  addButton: PropTypes.func
};

export default KeypadColumn;
