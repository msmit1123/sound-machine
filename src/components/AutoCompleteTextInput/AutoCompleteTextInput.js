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
      /**
       * load in a starting value if any is set via props
       * userInput here reperesents the visible value in the controlled input field
       * this is the single source of truth for this component. As this component could
       * exist by itself or within the context of a larget application. If it is part of
       * a larger application and you want to do
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
    // update the parent component with new info
    this.props.handleChange(userInput);

    // update the selection list with the new info
    this.handleSelectionList(userInput);
  };

  handleSelectionList = (userInput) => {
    //create a suggestions list with scoped to this function
    let suggestionsList;

    //(1) populate suggestions list:
    //(1A)if an API for where to check lists is provided via props, use that
    if (this.props.API.isUsingAPI) {
      //this.props.API.listURL;
      //this.props.API.function;
      //this.props.API.searchTerms;
      //this.props.API.callbackFunction;
    }
    if (this.props.APIList) {
      //suggestionsList = this.props.APIList;
      const req = new XMLHttpRequest();

      //build a data request
      var data = new FormData();
      data.append('type', 'name'); //name returns an array of the names or name-all to get the whole row
      data.append('term', userInput); //search term
      // set up these options for the API request
      // input: document.getElementById(opt.target),
      // wrap: document.getElementById('acWrap' + id),
      // box: document.getElementById('acBox' + id),
      // delay: opt.delay ? opt.delay : 500,
      // url: opt.url,
      // min: opt.min ? opt.min : 2,
      // data: opt.data ? opt.data : null,
      // fetch: opt.fetch ? opt.fetch : null,
      // select: opt.select ? opt.select : null,
      // timer: null
      // data.append('term', suggest.instance[id].input.value);
      // if (suggest.instance[id].data) {
      //   for (let key in suggest.instance[id].data) {
      //     data.append(key, suggest.instance[id].data[key]);
      //   }
      // }

      req.open(
        'POST',
        'http://mikiesmit.com/fun/das-sound-machine/test2/read-DB.php'
      );
      req.send(data);

      //what to do when a response is received
      req.onload = () => {
        if (req.status !== 200) {
          // if there is an error response
          console.log(`Error ${req.status}: ${req.statusText}`);
        } else {
          // show the result
          let suggestionsList;
          suggestionsList = JSON.parse(req.response);
          if (Array.isArray(suggestionsList)) {
            this.filterSuggestions(suggestionsList, userInput);
          }
        }
      };
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
