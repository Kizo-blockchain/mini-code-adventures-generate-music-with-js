const http = require("http");

const MidiConvert = require("midiconvert"); // npm install midiconvert
const scribble = require("scribbletune"); // npm install scribbletune
const path = require("path");
const express = require('express');
const port = process.env.PORT || 5000;

const createMidiForToneJs = () => {
  // let clip = scribble.clip({
  //   notes,
  //   pattern
  // });

 // let midiData;


//  const root = 'B2';
// const scale = 'minor';

// const getRandomPattern = function(count = 8) {
//   let str = '[x-]R';
//   for (let i = 1; i < count; i++) {
//     str += Math.round(Math.random()) ? '[x-]R' : 'R[x-]';
//   }

//   return str;
// };

// const pattern = getRandomPattern();

// const clipA = scribble.clip({
//   notes: root,
//   randomNotes: scribble.arp(
//     scribble.getChordsByProgression(root + ' ' + scale, 'ii iii')
//   ),
//   pattern,
//   subdiv: '16n',
// });

// const clipB = scribble.clip({
//   notes: root,
//   randomNotes: scribble.arp(
//     scribble.getChordsByProgression(root + ' ' + scale, 'vi v')
//   ),
//   pattern,
//   subdiv: '16n',
// });



 // let midiData = scribble.midi([].concat(clipA, clipA, clipA, clipB), null);

const ptn = 'xxxx'.repeat(7);
const A = 'xxx[x[RR]]';
const B = 'xx[x[RR]][x[RR]]';
const C = 'x-[x[RR]]';

const getRandomPattern = function(count = 8) {
  let str = '[xx][xx][xxx][xx]';
  for (let i = 1; i < count; i++) {
    str += Math.round(Math.random()) ? '[xR][[x[xR]]]' : '[[x[xR]]][xR]';
  }

  return str;
};

const patternch = getRandomPattern();

const getRandomPatternb = function(count = 8) {
  let str = '[-x]';
  for (let i = 1; i < count; i++) {
    str += Math.round(Math.random()) ? '[-x]-x' : 'x-[-x]';
  }

  return str;
};

const patternbass = getRandomPatternb();

const getRandomPatternblow = function(count = 8) {
  let str = '[[x[xR]]][xR]';
  for (let i = 1; i < count; i++) {
    str += Math.round(Math.random()) ? '[-xRx][-xRR][-xRx][-xxR]' : '[-xxR][-xRx][-xRR][-xRx]';
  }

  return str;
};

const patternbasslow = getRandomPatternblow();

const kick = scribble.clip({
  pattern: "x",
  notes: 'c4',
});

//scribble.midi(kick, 'kick.mid');
let midiptn = scribble.midi(ptn, null);


const ch = scribble.clip({
  pattern: patternch.repeat(16),
  notes: 'c4',
  sizzle: 'sin',
  sizzleReps: 32,
});

//scribble.midi(ch, 'ch.mid');
let midich = scribble.midi(ch, null);


const bass = scribble.clip({
  notes: 'Bb2',
  pattern: patternbass.repeat(16),
  randomNotes: scribble.scale('Bb2 minor').slice(1),
  accent: '--x-',
});

let midisbass = scribble.midi(bass, null);


const bassEnd = scribble.clip({
  notes: 'G#2',
  pattern: patternbasslow.repeat(16),
  randomNotes: scribble.scale('Bb2 harmonic minor').slice(2, 5),
  accent: '--x-',
});

//scribble.midi(bass.concat(bassEnd), 'bass.mid');
let midisbassEnd = scribble.midi(bassEnd, null);


const sA = '-x-x';
const sB = '[-x][-x][-x][xx]';
const snare = scribble.clip({
  notes: 'c4',
  pattern: (sA + sA + sB + sA + sA + sB + sA + sA).repeat(4),
});



//scribble.midi(snare, 'snare.mid');
let midisnare = scribble.midi(snare, null);

const oh = scribble.clip({
  notes: 'c4',
  pattern: '[-x]'.repeat(16),
});


let midiData = scribble.midi(oh, null);

//let midiData1 = scribble.midi(oh);


  console.log("check bytes : "+midiData)

   let midiconvertsnare = MidiConvert.parse(midisnare)
   let midiconvertsoh = MidiConvert.parse(midisnare)

   let midiconvertbass = MidiConvert.parse(midisbass)
   let midiconvertbassend = MidiConvert.parse(midisbassEnd)
   let midiconvertch = MidiConvert.parse(midich)
   let midiconvertptn = MidiConvert.parse(midiptn)



  // console.log(midiconvert)

  // console.log("midi converted")
  return {oh:midiconvertsoh, snare : midiconvertsnare,
   bass:midiconvertbass,
   bassend:midiconvertbassend,
   ch:midiconvertch,
   ptn:midiconvertptn};
};

// const server = http.createServer((req, res) => {
//   // Don't mind the naivety of the following URL router
//   switch (req.url.toLowerCase()) {
//     case "/":
//       res.end(indexHTMLContents);
//       break;
//     case "/midi.json":
//       res.statusCode = 200;
//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//       res.setHeader("Content-Type", "application/json");
//       const jsonString = JSON.stringify(createMidiForToneJs("CM", "xxxxxxx"));
//       res.end(jsonString);
//       break;
//      case "/ch":
//      res.sendFile(path.join(__dirname, './Hits', '/[CH]/E808_CH-01.wav'));
//      break;
     
//     default:
//       res.statusCode = 404;
//       res.end();
//   }
// });

// server.listen(3000); // Open http://localhost:3000 in browser


 var app = express();


  app.get('/midi.json', function(req, res) {
      res.statusCode = 200;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader("Content-Type", "application/json");
      const jsonString = JSON.stringify(createMidiForToneJs("CM", "xxxxxxx"));
      res.end(jsonString);
 });

  app.get('/ch/E808_CH-01.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/[CH]/E808_CH-01.wav'));
 });


   app.get('/oh/E808_OH-01.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/[OH]/E808_OH-01.wav'));
 });

      app.get('/bd/E808_BDl-04.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/[BD]/E808_BDl-04.wav'));
   });



app.listen(port);


// const server = http.createServer((req, res) => {
//   // Don't mind the naivety of the following URL router
//   switch (req.url.toLowerCase()) {
//     case "/":
//       res.end(indexHTMLContents);
//       break;
//     case "/midi.json":
//       res.statusCode = 200;
//       res.setHeader("Access-Control-Allow-Origin", "*");
//       res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//       res.setHeader("Content-Type", "application/json");
//       const jsonString = JSON.stringify(createMidiForToneJs("CM", "xxxxxxx"));
//       res.end(jsonString);
//       break;
//      case "/ch":
//      res.sendFile(path.join(__dirname, './Hits', '/[CH]/E808_CH-01.wav'));
//      break;
     
//     default:
//       res.statusCode = 404;
//       res.end();
//   }
// });

// server.listen(3000); // Open http://localhost:3000 in browser



// -- The HTML and Javascript for the "/" route. Obviously, don't do this in production!
/*
const jsToBeExecutedInBrowser = () => {
  document.querySelector("button").addEventListener(
    "click",
    async () => {
      Tone.Transport.clear();
      Tone.Transport.stop();

      const synth = new Tone.Synth().toMaster();

      const response = await fetch("/midi.json");
      const midiJson = await response.json();

      const midi = MidiConvert.fromJSON(midiJson);

      Tone.Transport.bpm.value = midi.bpm;
      Tone.Transport.timeSignature = midi.timeSignature;

      midi.tracks.forEach(track => {
        new Tone.Part((time, event) => {
          synth.triggerAttackRelease(
            event.name,
            event.duration,
            time,
            event.velocity
          );
        }, track.notes).start(midi.startTime);
      });

      Tone.Transport.start();
    },
    false
  );
};

const indexHTMLContents = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Midi Player</title>
  </head>
  <body>
  <button>Play!</button>
  <script src="https://unpkg.com/tone"></script>
  <script src="https://unpkg.com/midiconvert"></script>
  <script>
  (${jsToBeExecutedInBrowser.toString()})();
  </script>
  </body>
</html>`;*/
