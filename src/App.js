import React from 'react';

import './App.scss';

import Keypad from './containers/Keypad/Keypad.js';
import Controlpad from './containers/ControlPad/Controlpad.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOn: true, isSettingsMode: false };
  }
  render() {
    return (
      <div className='App'>
        Power: {this.state.isOn ? 'on' : 'off'} <br />
        Settings Mode: {this.state.isSettingsMode ? 'settings' : 'play'}
        <div className='sound-machine'>
          <Keypad />
          <Controlpad />
        </div>
      </div>
    );
  }
}

export default App;
