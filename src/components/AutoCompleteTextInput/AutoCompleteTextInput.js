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
      userInput: this.props.value // see code re-useability note below
      /** CODE RE-USEABLILTY NOTE:
       * load in a starting value if any is set via props
       * userInput here reperesents the visible value in the controlled input field
       * this is the single source of truth for this component.
       *
       * As this component could exist by itself or within the context of a larger application,
       * this is intentional becuase the parent component may or may not want to use this info,
       * so I am choosing to keep the state here local.
       *
       * If it is part of a larger application and you want to do
       * something with/from  the parent component, the parent component must pass in a
       * function as a prop to update whatever it is doing with this value.
       */
    };
  }

  onChange = (event) => {
    //get form input
    const userInput = event.currentTarget.value;

    this.setState({
      isShowingSuggestions: false,
      userInput: userInput //update the controlled input in this component
    });
    // update the parent component with new info.
    this.props.handleChange(userInput);

    // update the selection list with the new info
    this.handleSelectionList(userInput);
  };

  handleSelectionList = (userInput) => {
    //create a suggestions list with scoped to this function
    let suggestionsList;

    //(1) populate suggestions list:
    //(1A)if an API for where to check lists is provided via props, use that
    if (this.props.API.isUsing) {
      //run the search sending userInput
      let {
        requestFunction,
        requestURL,
        requestData,
        requestOptions
      } = this.props.API;
      requestData['term'] = userInput; //add userInput as search term to the request object.

      /* the request function should resolve itself and return an array with the following structure:
        [
          {id:12, name: 'suggestion 1'},
          {id:14, name: 'suggestion 2'},
          {id:22, name: 'suggestion 3'},
          etc
        ]

        on hover or arrow up down over,
        A second call to the API should request the id and be returned with the entire entry
        {id:12, name: 'suggestion 1', link: 'http...'}
        and store it in the state.

        on click or press enter,
        the value from the state should be passed into the callback function to populate the rest of the form appropriately
       */

      requestFunction(requestURL, requestData, requestOptions).then(
        (response) => {
          suggestionsList = response; //set the suggestions list to the returned array of suggestions from the API
          if (Array.isArray(suggestionsList)) {
            // confirm it is in fact an array, then
            this.filterSuggestions(suggestionsList, userInput);
          }
        }
      );

      //also do the callback in this.props.API?
    }

    //(1B) if an API is not provided and a static list is provided via props, set the suggestions list to that
    else if (this.props.staticList) {
      suggestionsList = this.props.staticList;
      this.filterSuggestions(suggestionsList, userInput);
    }
  };

  filterSuggestions = (suggestionsList, userInput) => {
    //client side rendering of list:
    const filteredSuggestions = suggestionsList.filter(
      (item) => item.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );

    this.setState({
      currentSuggestion: 0,
      filteredSuggestions: filteredSuggestions,
      isShowingSuggestions: true
    });
  };

  onClick = (event) => {
    const selectedEntry = event.currentTarget.innerText;

    this.setState({
      currentSuggestion: 0,
      filteredSuggestions: [],
      isShowingSuggestions: false,
      userInput: selectedEntry //update the controlled input in this component
    });
    // update the parent component with new info
    this.props.handleChange(selectedEntry);
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
      const selectedEntry = filteredSuggestions[currentSuggestion];
      this.setState({
        currentSuggestion: 0,
        isShowingSuggestions: false,
        userInput: selectedEntry //update the controlled input in this component
      });
      // update the parent component with new info
      this.props.handleChange(selectedEntry);
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
          autocomplete='off'
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
