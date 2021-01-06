const scribble = require('scribbletune');
let midiParser  = require('midi-parser-js');
let fs = require('fs')

const getRandomPattern = function(count) {
  let str = '';
  for (let i = 0; i < (count || 8); i++) {
    str += Math.round(Math.random()) ? 'x-' : '-xR';
  }

  return str;
};

//const pattern = getRandomPattern();

const chords = scribble.getChordsByProgression('C4 minor', 'ii III ii v'); //i III ii v
const notes = [];
let pattern = '';

chords.split(' ').forEach((c, i) => { 
  const chord = scribble.chord(c);
  if (i % 2 !== 0) {
    // use 2 quarter notes
    notes.push(chord[0]);
    notes.push(chord[1]);
    pattern = pattern + 'xx'
  } else {
    // use a quarter note and 2 eigth notes
    notes.push(chord[0]);
    notes.push(chord[1]);
    notes.push(chord[2]);
    pattern = pattern + 'x[xx]'
  }
});

const clip1 = scribble.clip({
  notes,
  pattern: pattern
});

const clip2 = scribble.clip({
  notes,
  pattern: pattern,
  subdiv: '2n'
});


scribble.midi(clip1, 'clip1.mid');
scribble.midi(clip2, 'clip2.mid');

const contents = fs.readFileSync('./clip1.mid', {encoding: 'base64'});

 console.log(contents);
// fs.readFile('./clip1.mid', 'base64', function (err,data) {
//   // Parse the obtainer base64 string ...
//   var midiArray = midiParser.parse(data);
//   // done!
 
// });



