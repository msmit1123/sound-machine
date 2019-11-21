import React from 'react';
import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {
  autoCompleteInterface,
  selectionCallback
} from '../../components/AutoCompleteTextInput/AutoCompleteInterface.js';

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
    this.handleEventChangeFor = this.handleEventChangeFor.bind(this);
    this.handleChangeFor = this.handleChangeFor.bind(this);
  }

  handleEventChangeFor = (propertyName) => (event) => {
    this.handleChangeFor(propertyName)(event.target.value);
  };

  handleChangeFor = (propertyName) => (str) => {
    this.setState({ [propertyName]: str });
  };

  populateFormWithAutoCompleteData = async (uniqueIdentifier) => {
    //build + make a request to the API to get the entire row of unique identifier request
    const response = await autoCompleteInterface.fetchData(
      'http://mikiesmit.com/fun/das-sound-machine/test2/read-DB.php',
      { type: 'id-all', term: uniqueIdentifier }
    );

    //update state of this form to be
    this.setState({
      url: response.link
    });
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
            onChange={this.handleEventChangeFor('pressKey')}
          />
          <hr />
          Clip Title:{' '}
          <AutoCompleteTextInput
            id='clip-title'
            className='autocomplete__input'
            placeholder='Name of sound'
            staticList={[['a', '1'], ['apple', 'asd'], 'babboon']} //dummy static list provided as proof of concept / fallback option
            API={{
              isUsing: true, //confirm we want to use the API in this form
              requestFunction: autoCompleteInterface.handleRequest,
              requestURL:
                'http://mikiesmit.com/fun/das-sound-machine/test2/read-DB.php',
              requestData: { type: 'name' },
              requestOptions: {}, //optional
              onSelectionCallback: this.populateFormWithAutoCompleteData //this is where I tell it what to do on selection...
            }}
            value={this.state.title}
            handleChange={this.handleChangeFor('title')}
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
            onChange={this.handleEventChangeFor('url')}
          />
          <hr />
          Volume: {this.state.volume}
          <input
            className='form__input'
            type='range'
            min='0'
            max='100'
            value={this.state.volume}
            onChange={this.handleEventChangeFor('volume')}
          />
          <hr />
          Playback Speed: {this.state.speed / 100 + 'x'}
          <input
            className='form__input'
            type='range'
            min='25'
            max='400'
            value={this.state.speed}
            onChange={this.handleEventChangeFor('speed')}
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
