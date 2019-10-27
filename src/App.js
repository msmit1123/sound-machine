import React from 'react';

import './App.scss';

import Keypad from './containers/Keypad/Keypad.js';
import Controlpad from './containers/ControlPad/Controlpad.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: true,
      isSettingsMode: false,
      soundLibrary: [
        [
          {
            pressKey: '1',
            title: 'chord 1',
            id: '',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
          },
          {
            pressKey: 'q',
            title: 'chord 2',
            id: '',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
          },
          {
            pressKey: 'a',
            title: 'chord 3',
            id: '',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
          },
          {
            pressKey: 'z',
            title: 'chord 1',
            id: '',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
          }
        ],
        [
          {
            pressKey: '2',
            title: 'open HH',
            id: '',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
          },
          {
            pressKey: 'w',
            title: 'punchy kick',
            id: '',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
          },
          {
            pressKey: 's',
            title: 'side stick',
            id: '',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
          },
          {
            pressKey: 'x',
            title: 'snare',
            id: '',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
          }
        ]
      ]
    };
  }
  render() {
    return (
      <div className='App'>
        {/* Power: {this.state.isOn ? 'on' : 'off'} <br />
        Settings Mode: {this.state.isSettingsMode ? 'settings' : 'play'} */}
        <div className='sound-machine'>
          <Keypad columnArray={this.state.soundLibrary} />
          <Controlpad />
        </div>
      </div>
    );
  }
}

export default App;
