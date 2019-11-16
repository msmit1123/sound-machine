import React from 'react';
import { PropTypes } from 'prop-types';

import './AutoCompleteTextInput.scss';

class AutoCompleteTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSuggestion: 0, // current highlighted suggestion
      filteredSuggestions: [],
      isShowingSuggestions: false,
      userInput: this.props.value
      /* load in a starting value if any
       * userInput here reperesents the visible value in the controlled input field
       * the parent component must pass in a function as a prop to update whatever
       * it is doing with this value.
       */
    };
  }

  onChange = (event) => {
    //create a suggestions list with correct scope
    let suggestionsList;

    //(1) populate suggestions list:
    //(1A)if an API for where to check lists is provided via props, use that instead
    if (this.props.APIList) {
      suggestionsList = this.props.APIList;
    }
    //(1B) if an API is not provided and a  static list is provided via props, set the suggestions list to that
    else if (this.props.staticList) {
      suggestionsList = this.props.staticList;
    }

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
      userInput: userInput //update the controlled input in this component
    });
    // update the parent component with new info
    this.props.handleChange(userInput);
  };

  onClick = (event) => {
    const selection = event.currentTarget.innerText;

    this.setState({
      currentSuggestion: 0,
      filteredSuggestions: [],
      isShowingSuggestions: false,
      userInput: selection //update the controlled input in this component
    });
    // update the parent component with new info
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
      const selection = filteredSuggestions[currentSuggestion];
      this.setState({
        currentSuggestion: 0,
        isShowingSuggestions: false,
        userInput: selection //update the controlled input in this component
      });
      // update the parent component with new info
      this.props.handleChange(selection);
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
