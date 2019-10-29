import React from 'react';
import { PropTypes } from 'prop-types';

import './FormOverlay.scss';

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
      tone: this.props.clipData.tone
    });
  }

  render() {
    return (
      <div
        className='form__overlay'
        onClick={this.props.closeEditButtonOverlay}
      >
        <div className='form__body'>
          <h3>Edit Button</h3>
          <h4>
            {'Column: ' +
              (parseInt(this.props.nowEditingButton.col) + 1) +
              '  Row: ' +
              (parseInt(this.props.nowEditingButton.row) + 1)}
          </h4>
          <hr />
          Key: <input type='text' placeholder={this.state.pressKey} />
          <hr />
          Track Title: <input type='text' placeholder={this.state.title} />
          <hr />
          URL: <input type='text' placeholder={this.state.url} />
          <hr />
          Volume: <input type='range' min='0' max='100' />
          <hr />
          Tone: <input type='range' min='0' max='100' />
          <hr />
          Delete Submit
        </div>
        {this.props.children}
      </div>
    );
  }
}

FormOverlay.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  nowEditingButton: PropTypes.shape({
    col: PropTypes.number,
    row: PropTypes.number
  })
};

export default FormOverlay;
