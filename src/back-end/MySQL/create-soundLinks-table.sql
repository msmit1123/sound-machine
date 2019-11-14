DROP TABLE IF EXISTS soundLinks;

CREATE TABLE `soundLinks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  `name` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL, /*max unique link length*/
  `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=INNODB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

ALTER TABLE `soundLinks`
  ADD UNIQUE KEY (`link`),
  ADD KEY (`name`);

INSERT INTO `soundLinks` (`name`, `link`) VALUES
('Piano C3', 'http://www.mikiesmit.com/libraries/audio/pianoShort/Piano__c3.mp3'),
('Piano D3',	'http://www.mikiesmit.com/libraries/audio/pianoShort/Piano__d3.mp3'),
('Piano E3',	'http://www.mikiesmit.com/libraries/audio/pianoShort/Piano__e3.mp3'),
('Guitar Chord 1',	'http://www.mikiesmit.com/libraries/audio/guitar-chords/guitar-chord-1.wav'),
('Guitar Chord 2',	'http://www.mikiesmit.com/libraries/audio/guitar-chords/guitar-chord-2wav'),
('Guitar Chord 3',	'http://www.mikiesmit.com/libraries/audio/guitar-chords/guitar-chord-3.wav'),
('Kick Drum 4',	'http://www.mikiesmit.com/libraries/audio/drums/kicks/TSB%20KICK%20(4).wav'),
('Kick Drum 5',	'http://www.mikiesmit.com/libraries/audio/drums/kicks/TSB%20KICK%20(5).wav'),
('High Hat Closed',	'http://www.mikiesmit.com/libraries/audio/drums/hats/TSB%20HAT%20C%20(3).wav'),
('High Hat Open',	'http://www.mikiesmit.com/libraries/audio/drums/hats/TSB%20HAT%20O%20(3).wav');
