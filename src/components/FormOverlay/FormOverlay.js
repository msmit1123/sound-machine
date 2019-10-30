import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './FormOverlay.scss';

import Button from '../Button/Button.js';

class FormOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    //set initial state to be what is passed in from library
    this.setState({
      pressKey: this.props.clipData.pressKey,
      title: this.props.clipData.title,
      url: this.props.clipData.url,
      volume: this.props.clipData.volume,
      speed: this.props.clipData.speed
    });
  }

  handleChangeFor = (propertyName) => (event) => {
    this.setState({ [propertyName]: event.target.value });
  };

  render() {
    return (
      <div
        className='form__overlay'
        onClick={this.props.closeEditButtonOverlay}
      >
        <div className='form__body'>
          <h3>Edit Button</h3>
          Key:{' '}
          <input
            className='form__input'
            type='text'
            maxLength='1'
            value={this.state.pressKey}
            onChange={this.handleChangeFor('pressKey')}
          />
          <hr />
          Clip Title:{' '}
          <input
            className='form__input'
            type='text'
            value={this.state.title}
            onChange={this.handleChangeFor('title')}
          />
          <hr />
          URL:{' '}
          <input
            className='form__input'
            type='text'
            value={this.state.url}
            onChange={this.handleChangeFor('url')}
          />
          <hr />
          Volume:{' '}
          <input
            className='form__input'
            type='range'
            min='0'
            max='100'
            value={this.state.volume}
            onChange={this.handleChangeFor('volume')}
          />
          <hr />
          Playback Speed:{' '}
          <input
            className='form__input'
            type='range'
            min='25'
            max='400'
            value={this.state.speed}
            onChange={this.handleChangeFor('speed')}
          />
          <hr />
          <div>
            <Button
              className='form__button form__button--left form__button--warning'
              onClick={this.props.deleteButton}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
            <Button
              className='form__button'
              onClick={() => this.props.updateButton(this.state)}
            >
              Save
            </Button>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

FormOverlay.propTypes = {
  children: PropTypes.node,
  closeEditButtonOverlay: PropTypes.func.isRequired,
  nowEditingColumn: PropTypes.number.isRequired,
  nowEditingRow: PropTypes.number.isRequired,
  updateButton: PropTypes.func,
  deleteButton: PropTypes.func
};

export default FormOverlay;
