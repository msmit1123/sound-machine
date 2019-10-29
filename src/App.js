import React from 'react';

import './App.scss';

import Keypad from './containers/Keypad/Keypad.js';
import Controlpad from './containers/ControlPad/Controlpad.js';
import FormOverlay from './components/FormOverlay/FormOverlay.js';

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
      display: 'welcome',
      currentVolume: 80,
      soundLibrary: [
        [
          {
            pressKey: '1',
            title: 'chord 1',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
          },
          {
            pressKey: 'q',
            title: 'chord 2',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
          },
          {
            pressKey: 'a',
            title: 'chord 3',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
          },
          {
            pressKey: 'z',
            title: 'closed HH',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
          }
        ],
        [
          {
            pressKey: '2',
            title: 'open HH',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
          },
          {
            pressKey: 'w',
            title: 'punchy kick',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
          },
          {
            pressKey: 's',
            title: 'side stick',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
          },
          {
            pressKey: 'x',
            title: 'snare',
            url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
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
    sound.currentTime = 0;
    sound.volume = this.state.currentVolume / 100;
    if (this.state.isOn) {
      sound.play();
      this.setState({ display: target.title });
    }
  }

  addButton(event) {
    const target = event.target; //div that was clicked
    let colIndex = target.parentNode.getAttribute('column-index'); //column that was clicked
    const soundLibraryCopy = JSON.parse(
      JSON.stringify(this.state.soundLibrary)
    );
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
    this.setState({ isFormOpen: true });
  }

  closeEditButtonOverlay() {
    this.setState({ isFormOpen: false });
  }

  handleKeyDown(event) {
    if (this.state.isOn) {
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
            closeEditButtonOverlay={this.closeEditButtonOverlay}
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
            ></FormOverlay>
          )}
        </div>
      </div>
    );
  }
}

export default App;
