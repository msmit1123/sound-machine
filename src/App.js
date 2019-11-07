import React from 'react';
import fileDownload from 'js-file-download';

import './App.scss';

import Keypad from './containers/Keypad/Keypad.js';
import Controlpad from './containers/ControlPad/Controlpad.js';
import FormOverlay from './components/FormOverlay/FormOverlay.js';

import { deepCopy } from './helperFunctions.js';
import {
  blankLoopLength,
  blankSoundLoop,
  demo1SoundLibrary
} from './initialSoundLibrary.js';

//declare scoped variables
const LOOP_TIMING_FIDELITY = 50;
const keyPresentlyHeld = {};
let soundLoop;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      isOn: true,
      isPlaying: false,
      isRecording: false,
      isSettingsMode: false,
      isFormOpen: false,
      title: 'change me',
      nowEditingColumn: 0,
      nowEditingRow: 0,
      display: 'welcome',
      currentVolume: 80,
      soundLibrary: demo1SoundLibrary,
      loopTime: 0,
      loopLength: blankLoopLength,
      loop: blankSoundLoop
    };

    //main four toggle buttons
    this.togglePlay = this.togglePlay.bind(this);
    this.toggleRecord = this.toggleRecord.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.togglePower = this.togglePower.bind(this);

    //audio manipulation / playing methods
    this.startPlayingLoop = this.startPlayingLoop.bind(this);
    this.stopPlayingLoop = this.stopPlayingLoop.bind(this);
    this.playSoundsInLoop = this.playSoundsInLoop.bind(this);
    this.advanceLoopTime = this.advanceLoopTime.bind(this);
    this.playSound = this.playSound.bind(this);
    this.pauseAllAudio = this.pauseAllAudio.bind(this);
    this.handleSoundButtonClick = this.handleSoundButtonClick.bind(this);

    //settings manipulation methods
    this.changeTime = this.changeTime.bind(this);
    this.changeLoopLength = this.changeLoopLength.bind(this);
    this.changeTitle = this.changeTitle.bind(this);
    this.changeVolume = this.changeVolume.bind(this);

    //methods to modify keypad
    this.addButton = this.addButton.bind(this);
    this.editButton = this.editButton.bind(this);
    this.deleteButton = this.deleteButton.bind(this);
    this.unlightAllPadButtons = this.unlightAllPadButtons.bind(this);

    //keypad setting overlay
    this.updateButton = this.updateButton.bind(this);
    this.closeEditButtonOverlay = this.closeEditButtonOverlay.bind(this);

    //file manipulation methods
    this.setSoundLibrary = this.setSoundLibrary.bind(this);
    this.saveAndDownloadState = this.saveAndDownloadState.bind(this);
    this.importState = this.importState.bind(this);

    //keyboard binding
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  //Set up error handling
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
    alert('unfortunately we have encountered an error');
  }

  //life cycle
  componentDidMount() {
    //add event listener for keyboard presses on mount
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }
  componentWillUnmount() {
    //remove on unmount
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('keyup', this.handleKeyUp);
    this.stopPlayingLoop();
  }

  //main four toggle buttons
  togglePlay() {
    if (this.state.isOn && !this.state.isSettingsMode) {
      if (this.state.isPlaying) {
        this.setState({ isPlaying: false, isRecording: false });
        this.stopPlayingLoop();
        this.pauseAllAudio();
      } else {
        this.setState({ isPlaying: true });
        this.startPlayingLoop();
      }
    }
  }
  toggleRecord() {
    if (this.state.isOn && !this.state.isSettingsMode) {
      if (!this.state.isRecording) {
        this.setState({ isPlaying: true, isRecording: true });
        this.startPlayingLoop();
      } else {
        this.setState({ isRecording: false });
      }
    }
  }
  toggleSettings() {
    if (this.state.isOn) {
      if (this.state.isSettingsMode) {
        this.setState({ isSettingsMode: false });
      } else {
        this.stopPlayingLoop();
        this.pauseAllAudio();
        this.setState({
          isSettingsMode: true,
          isRecording: false,
          isPlaying: false
        });
      }
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
      this.stopPlayingLoop();
    }
    if (!this.state.isOn) {
      this.setState({ isOn: true });
    }
  }

  //audio manipulation / playing methods
  startPlayingLoop() {
    if (!this.state.isPlaying) {
      soundLoop = setInterval(this.playSoundsInLoop, LOOP_TIMING_FIDELITY);
      this.setState({ isPlaying: true });
    }
  }
  stopPlayingLoop() {
    clearInterval(soundLoop);
  }
  playSoundsInLoop() {
    const curTime = this.state.loopTime;
    const soundsInThisInterval = this.state.loop.filter(
      (item) =>
        item.time >= curTime && item.time < curTime + LOOP_TIMING_FIDELITY
    );
    soundsInThisInterval.forEach((item) =>
      this.playSound(item.column, item.row)
    );
    this.advanceLoopTime();
  }
  advanceLoopTime() {
    this.setState((prevState) => ({
      loopTime: prevState.loopTime + LOOP_TIMING_FIDELITY
    }));
    if (this.state.loopTime > this.state.loopLength) {
      this.setState({ loopTime: 0 });
    }
  }
  pauseAllAudio() {
    const sounds = document.getElementsByTagName('audio');
    for (let i = 0; i < sounds.length; i++) {
      sounds[i].pause();
      sounds[i].currentTime = 0;
    }
  }
  handleSoundButtonClick(event, id) {
    let target;
    if (event) {
      target = event.target;
    }
    if (id) {
      target = id;
    }
    const column = target.parentNode.getAttribute('column-index');
    const row = target.getAttribute('row-index');
    const clicked = true;
    this.playSound(column, row, clicked);
    if (this.state.isRecording) {
      const loopCopy = deepCopy(this.state.loop);
      loopCopy.push({
        time: this.state.loopTime,
        column: column,
        row: row
      });
      this.setState({ loop: loopCopy });
    }
  }
  playSound(columnNum, rowNum, clicked) {
    const column = document.getElementsByClassName('keypad__column')[columnNum];
    const row = column.getElementsByClassName('keypad__button')[rowNum];
    const sound = row.getElementsByTagName('audio')[0];
    const globalVolume = this.state.currentVolume / 100;
    const clipData = this.state.soundLibrary[columnNum][rowNum];
    const clipVolume = clipData.volume ? clipData.volume / 100 : 1;
    const clipSpeed = clipData.speed ? clipData.speed / 100 : 1;
    const { title } = clipData;

    sound.currentTime = 0;
    sound.volume = globalVolume * clipVolume;
    sound.playbackRate = clipSpeed;
    if (this.state.isOn) {
      sound.play();
      if (clicked === true) {
        this.setState({ display: title });
      }
    }
  }

  //settings manipulation methods
  changeLoopLength(event) {
    if (this.state.isOn) {
      const time = event.target.value;
      this.setState({ loopLength: time });
    }
  }
  changeTime(event) {
    if (this.state.isOn) {
      const time = parseInt(event.target.value);
      this.setState({ loopTime: time });
    }
  }
  changeTitle(event) {
    const title = event.target.value;
    this.setState({ title: title });
  }
  changeVolume(event) {
    if (this.state.isOn) {
      const volume = event.target.value;
      this.setState({ currentVolume: volume, display: 'volume: ' + volume });
    }
  }

  //file manipulation methods
  setSoundLibrary(length, library, loop) {
    this.setState({
      soundLibrary: library ? library : this.state.soundLibrary,
      loopTime: 0,
      loopLength: length ? length : this.state.loopLength,
      loop: loop ? loop : this.state.loop
    });
  }
  saveAndDownloadState() {
    let filename = this.state.title !== '' ? this.state.title : 'new-song';
    fileDownload(JSON.stringify(this.state), filename + '.DSM');
  }
  importState(fileContents) {
    this.setState(JSON.parse(fileContents));
  }

  //methods to modify keypad
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
    let target = event.target; //get element that was clicked
    //if the gear icon is clicked rather than the button, make sure to get the div itself
    if (!target.hasAttribute('row-index')) {
      target = target.closest('.keypad__button');
    }
    let row = target.getAttribute('row-index'); //get its row number
    const col = target.parentNode.getAttribute('column-index'); //get its column number
    this.setState({
      isFormOpen: true,
      nowEditingColumn: col, //use X/Y Location because IDs may not be set up yet
      nowEditingRow: row
    });
    this.forceUpdate();
  }
  deleteButton() {
    let soundLibraryCopy = deepCopy(this.state.soundLibrary);
    soundLibraryCopy[this.state.nowEditingColumn].splice(
      this.state.nowEditingRow,
      1
    );
    if (soundLibraryCopy[this.state.nowEditingColumn].length === 0) {
      soundLibraryCopy.splice(this.state.nowEditingColumn, 1);
    }
    this.setState({ soundLibrary: soundLibraryCopy });
    this.closeEditButtonOverlay();
  }
  unlightAllPadButtons() {
    const buttons = document.getElementsByClassName('keypad__button');
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].classList.remove('keypad__button--active');
    }
  }

  //keypad setting overlay
  updateButton(formState) {
    let soundLibraryCopy = deepCopy(this.state.soundLibrary);
    soundLibraryCopy[this.state.nowEditingColumn][
      this.state.nowEditingRow
    ] = formState;
    this.setState({ soundLibrary: soundLibraryCopy });

    this.closeEditButtonOverlay();
  }
  closeEditButtonOverlay(event) {
    if (event === undefined || event.target === event.currentTarget) {
      this.setState({
        isFormOpen: false,
        nowEditingButton: { col: 0, row: 0 }
      });
      this.forceUpdate();
    } else {
      return;
    }
  }

  //set up keyboard binding
  handleKeyDown(event) {
    const key = document.getElementById(event.key);
    //handle spacebar
    if (event.key === ' ') {
      event.preventDefault();
      if (!this.state.isSettingsMode) {
        this.togglePlay();
      }
    }

    //handle everything else
    if (this.state.isOn && !this.state.isSettingsMode) {
      if (keyPresentlyHeld[event.key]) {
        return;
      }

      if (key !== null) {
        this.handleSoundButtonClick(false, key); // is the id of a keypad element
        key.classList.add('keypad__button--active'); //make the button active
      }
    }

    keyPresentlyHeld[event.key] = true;
  }
  handleKeyUp(event) {
    //make sure both upper and lowercase are turned off in case
    const keyArr = [event.key.toUpperCase(), event.key.toLowerCase()];
    keyArr.forEach((item) => {
      keyPresentlyHeld[item] = false;
      const itemElement = document.getElementById(item);
      if (itemElement !== null) {
        itemElement.classList.remove('keypad__button--active'); //make the button not active
      }
    });
  }

  render() {
    if (this.state.hasError) {
      // render error fallback UI
      return <h1>Something went wrong. Please Refresh</h1>;
    }
    return (
      <div className='App'>
        <div className='sound-machine'>
          <Keypad
            columnArray={this.state.soundLibrary}
            handleSoundButtonClick={this.handleSoundButtonClick}
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
            loopTime={this.state.loopTime}
            changeTime={this.changeTime}
            loopLength={this.state.loopLength}
            changeLoopLength={this.changeLoopLength}
            //
            title={this.state.title}
            changeTitle={this.changeTitle}
            //
            setSoundLibrary={this.setSoundLibrary}
            saveAndDownloadState={this.saveAndDownloadState}
            importState={this.importState}
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
              nowEditingColumn={this.state.nowEditingColumn}
              nowEditingRow={this.state.nowEditingRow}
              updateButton={this.updateButton}
              deleteButton={this.deleteButton}
              //pass in information about the currently being edited clip
              clipData={
                this.state.soundLibrary[this.state.nowEditingColumn][
                  this.state.nowEditingRow
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
