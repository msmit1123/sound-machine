import React from 'react';
import { PropTypes } from 'prop-types';

import './AutoCompleteTextInput.scss';

class AutoCompleteTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staticList: this.props.staticList,
      APIList: this.props.APIList,
      currentSuggestion: 0,
      filteredSuggestions: [],
      isShowingSuggestions: false,
      userInput: this.props.value
    };
  }

  onChange = (event) => {
    //create a suggestions list with correct scope
    let suggestionsList;

    //populate suggestions list:
    //if a static list is provided via props, set the suggestions list to that
    if (this.state.staticList) {
      suggestionsList = this.state.staticList;
    }

    //if an API for where to check lists is provided via props, use that instead
    //if(this.state.APIList){suggestionsList = this.state.APIList}

    //update source of truth in FormOverlay Component
    const userInput = event.currentTarget.value;

    //client side rendering for static list:
    const filteredSuggestions = suggestionsList.filter(
      (item) => item.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      currentSuggestion: 0,
      filteredSuggestions: filteredSuggestions,
      isShowingSuggestions: true,
      userInput: userInput
    });

    // do this after setting state because the delay react takes to update the state
    this.props.handleChange(userInput);
  };

  onClick = (event) => {
    const selection = event.currentTarget.innerText;

    this.setState({
      currentSuggestion: 0,
      filteredSuggestions: [],
      isShowingSuggestions: false,
      userInput: selection
    });

    // do this after setting state because the delay react takes to update the state
    this.props.handleChange(selection);
  };

  onMouseEnter = (event) => {
    this.setState({
      currentSuggestion: parseInt(event.currentTarget.getAttribute('index'))
    });
  };

  onKeyDown = (event) => {
    const { currentSuggestion, filteredSuggestions } = this.state;

    //enter pressed
    if (event.keyCode === 13) {
      this.props.handleChange(filteredSuggestions[currentSuggestion]);
      this.setState({
        currentSuggestion: 0,
        isShowingSuggestions: false,
        userInput: this.props.value
      });
    }

    //Up arrow pressed
    else if (event.keyCode === 38) {
      if (currentSuggestion === 0) {
        return;
      }
      this.setState({ currentSuggestion: currentSuggestion - 1 });
    }

    //Down arrow pressed
    else if (event.keyCode === 40) {
      if (currentSuggestion === filteredSuggestions.length - 1) {
        return; //if at the bottom of the list, return
      }
      this.setState({ currentSuggestion: currentSuggestion + 1 });
    }

    //Escape pressed
    else if (event.keyCode === 27) {
      this.setState({ isShowingSuggestions: false });
    }

    //Spacebar pressed
    else if (event.keyCode === 38) {
      //insert space into input
    }
  };

  render() {
    let optionList;
    const { staticList, APIList, handleChange, ...props } = this.props; //intentionally strip these from props
    if (this.state.isShowingSuggestions && this.state.userInput) {
      if (this.state.filteredSuggestions.length) {
        optionList = (
          <ul className='autocomplete__suggestions-list'>
            {this.state.filteredSuggestions.map((item, index) => {
              let className = 'autocomplete__suggestion-item';
              if (index === this.state.currentSuggestion) {
                className += ' autocomplete__suggestion-item--active';
              }
              return (
                <li
                  className={className}
                  key={item}
                  index={index}
                  onClick={this.onClick}
                  onMouseEnter={this.onMouseEnter}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        );
      }
    }
    return (
      <div className='autocomplete__container'>
        <input
          type='text'
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          value={this.state.userInput}
          {...props}
        />
        {/* <input type='submit' value='' className='search-btn' /> */}
        {optionList}
      </div>
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
