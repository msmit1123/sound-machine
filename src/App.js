import React from 'react';

import './App.scss';

import Keypad from './containers/Keypad/Keypad.js';
import Controlpad from './containers/ControlPad/Controlpad.js';
import FormOverlay from './components/FormOverlay/FormOverlay.js';

import { deepCopy } from './helperFunctions.js';

const keyPresentlyHeld = {};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: true,
      isPlaying: false,
      isRecording: false,
      isSettingsMode: false,
      isFormOpen: false,
      nowEditingButton: { col: null, row: null },
      display: 'welcome',
      currentVolume: 80,
      soundLibrary: [
        [
          {
            pressKey: '1',
            title: 'chord 1',
            volume: 100,
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
          },
          {
            pressKey: 'q',
            title: 'chord 2',
            volume: 100,
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
          },
          {
            pressKey: 'a',
            title: 'chord 3',
            volume: 100,
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
          },
          {
            pressKey: 'z',
            title: 'closed HH',
            volume: 100,
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
          }
        ],
        [
          {
            pressKey: '2',
            title: 'open HH',
            volume: 100,
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
          },
          {
            pressKey: 'w',
            title: 'punchy kick',
            volume: 100,
            url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
          },
          {
            pressKey: 's',
            title: 'side stick',
            volume: 100,
            url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
          },
          {
            pressKey: 'x',
            title: 'snare',
            volume: 100,
            url:
              'http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Instruments/Drums/Hihats/idg_Hi_H-intermed-2283/idg_Hi_H-intermed-2283_hifi.mp3'
          }
        ]
      ]
    };

    this.playSound = this.playSound.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    this.pauseAllAudio = this.pauseAllAudio.bind(this);
    this.changeVolume = this.changeVolume.bind(this);

    this.togglePlay = this.togglePlay.bind(this);
    this.toggleRecord = this.toggleRecord.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.togglePower = this.togglePower.bind(this);

    this.addButton = this.addButton.bind(this);
    this.editButton = this.editButton.bind(this);
    this.updateButton = this.updateButton.bind(this);
    this.closeEditButtonOverlay = this.closeEditButtonOverlay.bind(this);
  }

  componentDidMount() {
    //add event listener for keyboard presses on mount
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
    document.addEventListener('mousedown', this.handleMouseDown);
    document.addEventListener('mouseup', this.handleMouseUp);
  }
  componentWillUnmount() {
    //remove on unmount
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
  }

  togglePlay() {
    if (this.state.isOn) {
      this.setState((prevState) => ({ isPlaying: !prevState.isPlaying }));
    }
  }
  toggleRecord() {
    if (this.state.isOn) {
      if (!this.state.isRecording) {
        this.setState({ isPlaying: true, isRecording: true });
      } else {
        this.setState({ isRecording: false });
      }
    }
  }
  toggleSettings() {
    if (this.state.isOn) {
      this.setState((prevState) => ({
        isSettingsMode: !prevState.isSettingsMode
      }));
    }
  }
  togglePower() {
    if (this.state.isOn) {
      this.setState({
        isOn: false,
        isPlaying: false,
        isRecording: false,
        isSettingsMode: false,
        display: ''
      });
      this.pauseAllAudio();
      this.unlightAllPadButtons();
    }
    if (!this.state.isOn) {
      this.setState({ isOn: true });
    }
  }

  pauseAllAudio() {
    const sounds = document.getElementsByTagName('audio');
    for (let i = 0; i < sounds.length; i++) {
      sounds[i].pause();
      sounds[i].currentTime = 0;
    }
  }
  unlightAllPadButtons() {
    const buttons = document.getElementsByClassName('keypad__button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('keypad__button--active');
    }
  }

  changeVolume(event) {
    if (this.state.isOn) {
      const volume = event.target.value;
      this.setState({ currentVolume: volume, display: 'volume: ' + volume });
    }
  }

  playSound(event) {
    const target = event.target;
    const sound = target.getElementsByTagName('audio')[0];
    const globalVolume = this.state.currentVolume / 100;
    const clipVolume = target.getAttribute('clipVolume') / 100;
    sound.currentTime = 0;
    sound.volume = globalVolume * clipVolume;
    if (this.state.isOn) {
      sound.play();
      this.setState({ display: target.title });
    }
  }

  addButton(event) {
    const target = event.target; //div that was clicked
    let colIndex = target.parentNode.getAttribute('column-index'); //column that was clicked
    const soundLibraryCopy = deepCopy(this.state.soundLibrary);

    if (colIndex === 'addNewColumn') {
      soundLibraryCopy.push([]); //add new blank colulmn
      colIndex = soundLibraryCopy.length - 1; //set index to the new column
    }
    soundLibraryCopy[colIndex].push({});

    this.setState({
      soundLibrary: soundLibraryCopy
    });
  }

  editButton(event) {
    const target = event.target; //get div that was clicked
    const col = target.parentNode.getAttribute('column-index'); //get its column number
    const row = target.getAttribute('row-index'); //get its row number
    this.setState({
      isFormOpen: true,
      nowEditingButton: { col: col, row: row } //use X/Y Location because IDs may not be set up yet
    });
    this.forceUpdate();
  }

  updateButton(formState) {
    let soundLibraryCopy = deepCopy(this.state.soundLibrary);
    soundLibraryCopy[this.state.nowEditingButton.col][
      this.state.nowEditingButton.row
    ] = formState;
    this.setState({ soundLibrary: soundLibraryCopy });

    this.closeEditButtonOverlay();
  }

  closeEditButtonOverlay(event) {
    if (event === undefined || event.target === event.currentTarget) {
      this.setState({
        isFormOpen: false,
        nowEditingButton: { col: null, row: null }
      });
    } else {
      return;
    }
  }

  handleKeyDown(event) {
    if (this.state.isOn && !this.state.isSettingsMode) {
      const key = document.getElementById(event.key);
      if (keyPresentlyHeld[event.key]) {
        return;
      }

      if (key !== null) {
        key.click();
        key.classList.add('keypad__button--active'); //make the button active
      }
    }

    keyPresentlyHeld[event.key] = true;
  }

  handleKeyUp(event) {
    const key = document.getElementById(event.key);
    if (key !== null) {
      key.classList.remove('keypad__button--active'); //make the button active
    }
    keyPresentlyHeld[event.key] = false;
  }

  render() {
    return (
      <div className='App'>
        {/* Power: {this.state.isOn ? 'on' : 'off'} <br />
        Settings Mode: {this.state.isSettingsMode ? 'settings' : 'play'} */}
        <div className='sound-machine'>
          <Keypad
            columnArray={this.state.soundLibrary}
            playSound={this.playSound}
            editButton={this.editButton}
            isSettingsMode={this.state.isSettingsMode}
            addButton={this.addButton}
          />
          <Controlpad
            isPlaying={this.state.isPlaying}
            togglePlay={this.togglePlay}
            //
            isRecording={this.state.isRecording}
            toggleRecord={this.toggleRecord}
            //
            isSettingsMode={this.state.isSettingsMode}
            toggleSettings={this.toggleSettings}
            //
            isOn={this.state.isOn}
            togglePower={this.togglePower}
            //
            display={this.state.display}
            //
            currentVolume={this.state.currentVolume}
            changeVolume={this.changeVolume}
          />
          {/* show form overlay if a button is open for editing */}
          {this.state.isFormOpen && (
            <FormOverlay
              closeEditButtonOverlay={this.closeEditButtonOverlay}
              nowEditingButton={this.state.nowEditingButton}
              updateButton={this.updateButton}
              //pass in information about the currently being edited clip
              clipData={
                this.state.soundLibrary[this.state.nowEditingButton.col][
                  this.state.nowEditingButton.row
                ]
              }
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
