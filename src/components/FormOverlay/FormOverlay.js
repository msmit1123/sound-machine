import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import './FormOverlay.scss';

import Button from '../Button/Button.js';
import AutoCompleteTextInput from '../AutoCompleteTextInput/AutoCompleteTextInput';

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
      volume: this.props.clipData.volume ? this.props.clipData.volume : 100,
      speed: this.props.clipData.speed ? this.props.clipData.speed : 100
    });
    this.handleChangeFor = this.handleChangeFor.bind(this);
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
          <AutoCompleteTextInput
            id='clip-title'
            className='autocomplete__input'
            staticList={['a', 'b', 'apple', 'babbooon']}
            //value={this.state.title}
            //onChange={this.handleChangeFor('title')}
            //pass in an API / autocomplete library to reference
            //optionally a static list of options in lieu of API
            //optionally pass in max number of desired results
            //optionally pass in the number of characters before it starts outputting suggestions
            //optionally tell it to only query this one or link a series of queries together
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
          Volume: {this.state.volume}
          <input
            className='form__input'
            type='range'
            min='0'
            max='100'
            value={this.state.volume}
            onChange={this.handleChangeFor('volume')}
          />
          <hr />
          Playback Speed: {this.state.speed / 100 + 'x'}
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
