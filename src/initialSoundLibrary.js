export const initialSoundLibrary = [
  [
    {
      pressKey: '1',
      title: 'chord 1',
      volume: 100,
      speed: 100,
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
    },
    {
      pressKey: 'q',
      title: 'chord 2',
      volume: 100,
      speed: 100,
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
    },
    {
      pressKey: 'a',
      title: 'chord 3',
      volume: 100,
      speed: 100,
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
    },
    {
      pressKey: 'z',
      title: 'closed HH',
      volume: 100,
      speed: 100,
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
  ],
  [
    {
      pressKey: '2',
      title: 'open HH',
      volume: 100,
      speed: 100,
      url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
    },
    {
      pressKey: 'w',
      title: 'punchy kick',
      volume: 100,
      speed: 100,
      url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
    },
    {
      pressKey: 's',
      title: 'side stick',
      volume: 100,
      speed: 100,
      url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
    },
    {
      pressKey: 'x',
      title: 'snare',
      volume: 100,
      speed: 100,
      url:
        'http://www.flashkit.com/imagesvr_ce/flashkit/soundfx/Instruments/Drums/Hihats/idg_Hi_H-intermed-2283/idg_Hi_H-intermed-2283_hifi.mp3'
    }
  ]
];

export const initialLoopLength = 1800;

export const initialSoundLoop = [
  { time: 0, column: 1, row: 1 },
  { time: 500, column: 1, row: 0 },
  { time: 700, column: 1, row: 1 },
  { time: 1150, column: 1, row: 1 },
  { time: 1400, column: 1, row: 0 }
];
