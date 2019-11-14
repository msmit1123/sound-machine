import React from 'react';
import { PropTypes } from 'prop-types';

import './AutoCompleteTextInput.scss';

class AutoCompleteTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSuggestion: 0,
      filteredSuggestions: [],
      isShowingSuggestions: false,
      userInput: ''
    };
  }

  onChange = (event) => {
    const options = ['a', 'b', 'apple', 'babbooon'];
    /**
     * **************************************************************************
     * depending on props, use props supplied list or props API Input here
     */
    const userInput = event.currentTarget.value;

    const filteredSuggestions = options.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      currentSuggestion: 0,
      filteredSuggestions,
      isShowingSuggestions: true,
      userInput: event.currentTarget.value
    });
  };

  onClick = (event) => {
    this.setState({
      currentSuggestion: 0,
      filteredSuggestions: [],
      isShowingSuggestions: false,
      userInput: event.currentTarget.innerText
    });
  };
  onKeyDown = (event) => {
    const { currentSuggestion, filteredSuggestions } = this.state;

    //enter pressed
    if (event.keyCode === 13) {
      this.setState({
        currentSuggestion: 0,
        isShowingSuggestions: false,
        userInput: filteredSuggestions[currentSuggestion]
      });

      //Up arrow pressed
    } else if (event.keyCode === 38) {
      if (currentSuggestion === 0) {
        return;
      }
      this.setState({ currentSuggestion: currentSuggestion - 1 });

      //Down arrow pressed
    } else if (event.keyCode === 40) {
      if (currentSuggestion === filteredSuggestions.length - 1) {
        return; //if at the bottom of the list, return
      }
      this.setState({ currentSuggestion: currentSuggestion + 1 });

      //Escape pressed
    } else if (event.keyCode === 27) {
      this.setState({ isShowingSuggestions: false });
    }
  };

  render() {
    const {
      onChange,
      onClick,
      onKeyDown,

      state: {
        currentSuggestion,
        filteredSuggestions,
        isShowingSuggestions,
        userInput
      }
    } = this;
    let optionList;
    if (isShowingSuggestions && userInput) {
      if (filteredSuggestions.length) {
        optionList = (
          <ul className='options'>
            {filteredSuggestions.map((optionName, index) => {
              let className;
              if (index === currentSuggestion) {
                className = 'option-active';
              }
              return (
                <li className={className} key={optionName} onClick={onClick}>
                  {optionName}
                </li>
              );
            })}
          </ul>
        );
      } else {
        optionList = (
          <div className='no-options'>
            <em>No Option!</em>
          </div>
        );
      }
    }
    return (
      <React.Fragment>
        <div className='search'>
          <input
            type='text'
            className='form__input'
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
          />
          {/* <input type='submit' value='' className='search-btn' /> */}
        </div>
        {optionList}
      </React.Fragment>
    );
  }
}

/**
 *
 */

AutoCompleteTextInput.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  onPointerDown: PropTypes.func,

  className: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.string
};

export default AutoCompleteTextInput;
