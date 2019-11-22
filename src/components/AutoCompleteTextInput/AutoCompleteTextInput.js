import React from 'react';
import { PropTypes } from 'prop-types';

import './AutoCompleteTextInput.scss';
import { autoCompleteInterface } from './AutoCompleteInterface';

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
       * function as a prop (called handleChange) to update whatever it is doing with this value.
       */
    };
  }

  componentDidMount = () => {
    document.addEventListener('click', this.closeSelectionBox);
  };

  componentWillUnmount = () => {
    document.removeEventListener('click', this.closeSelectionBox);
  };

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

  handleSelectionList = async (userInput) => {
    //(1) populate suggestions list:
    //(1A)if an API for where to check lists is provided via props, use that
    if (this.props.API && this.props.API.isUsing) {
      //run the search sending userInput
      let {
        requestFunction,
        requestURL,
        requestData,
        requestOptions
      } = this.props.API;
      requestData.term = userInput; //add userInput as search term to the request data object.

      if (!requestOptions) {
        //if a request options prop wasn't passed in, create a blank one.
        requestOptions = {};
      }
      requestOptions.timerLoc = document.getElementById(this.props.id); //add a scope location to attach a timeout timer to on the client side

      /* the request function should resolve itself and return an array with the following structure:
        [
          [informationWeSought,optionalUniqueIdenfifier],
          [informationWeSought,optionalUniqueIdenfifier],
          [informationWeSought,optionalUniqueIdenfifier],
          etc
        ]
       */

      // Get the list of suggestions from the provided API, piping in requestData to be sent to the server and client side request options.
      const suggestionsList = await requestFunction(
        requestURL,
        requestData,
        requestOptions
      );
      this.filterSuggestions(suggestionsList, userInput);
    }

    //(1B) if an API is not provided and a static list is provided via props, set the suggestions list to that
    else if (this.props.staticList) {
      // will accept a static list format of varying thoroughness:
      // lazy: ['a','b','c','d'] or
      // mid: [['a'],['b'],['c'],['d']]
      // thorough: [['apple','uniqueIdA'],['bobcat','uniqueIdB'],['castle','uniqueIdC']]

      const suggestionsList = []; //ensure we have a blank array

      // it must must be converted to the latter format
      this.props.staticList.forEach((item, index) => {
        if (Array.isArray(item)) {
          suggestionsList.push(item); // handle thorough formatting
          if (!suggestionsList[index][1]) {
            // handle mid formating
            suggestionsList[index].push('ID' + index);
          }
        } else {
          // handle lazy formating
          suggestionsList.push([item, 'ID' + index]);
        }
      });
      this.filterSuggestions(suggestionsList, userInput);
    }
  };

  filterSuggestions = (suggestionsList, userInput) => {
    if (Array.isArray(suggestionsList)) {
      //client side rendering of list:
      const filteredSuggestions = suggestionsList.filter(
        (item) => item[0].toLowerCase().indexOf(userInput.toLowerCase()) > -1
      );

      this.setState({
        currentSuggestion: 0,
        filteredSuggestions: filteredSuggestions,
        isShowingSuggestions: true
      });
    }
  };

  //selected Entry should be ['selection name','unique identifier to be passed to callback']
  makeSelection = (selectedEntry) => {
    this.setState({
      currentSuggestion: 0,
      filteredSuggestions: [],
      isShowingSuggestions: false,
      userInput: selectedEntry[0] //update the controlled input in this component
    });
    // update the parent component with new info
    this.props.handleChange(selectedEntry[0]);

    //if API is enable and a callback function is present, do it
    if (
      this.props.API &&
      this.props.API.isUsing &&
      this.props.API.onSelectionCallback
    ) {
      //pipe selected entry unique identifier into the selection
      this.props.API.onSelectionCallback(selectedEntry[1]);
    }
  };

  closeSelectionBox = () => {
    this.setState({ isShowingSuggestions: false });
  };

  //when a suggestion is clicked
  onClick = (event) => {
    const selectionClicked = event.currentTarget.getAttribute('index');
    if (selectionClicked !== null) {
      const selectedEntry = this.state.filteredSuggestions[selectionClicked];
      this.makeSelection(selectedEntry);
    } else {
      this.closeSelectionBox();
    }
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
      this.makeSelection(selectedEntry);
    }

    //Up arrow pressed
    else if (event.keyCode === 38) {
      if (currentSuggestion === 0) {
        return;
      }
      this.setState({ currentSuggestion: currentSuggestion - 1 });
    }

    //right arrow pressed for test
    else if (event.keyCode === 39) {
      async function test() {
        const testValue = await autoCompleteInterface.fetchData(
          'http://mikiesmit.com/fun/das-sound-machine/test2/write-DB.php',
          {
            name: 'Piano C3',
            link:
              'http://www.mikiesmit.com/libraries/audio/pianoShort/Piano__c3.mp3'
          }
        );
        console.log(testValue);
      }
      test();
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
                  key={item[1]}
                  index={index}
                  uniqueid={item[1]}
                  onClick={this.onClick}
                  onMouseEnter={this.onMouseEnter}
                >
                  {item[0]}
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
