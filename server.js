const http = require("http");

const MidiConvert = require("midiconvert"); // npm install midiconvert
const scribble = require("scribbletune"); // npm install scribbletune
const path = require("path");
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

const createMidiForToneJs = () => {


var chArray = [
    '--x---x---x---x-',
    'xxxxxxxxxxxxxxxx',
    '-x-xxxx-xx-xx-xx',
    '--x---x---x-xxxx',
    '--x-------x-----'
];
var randomChPatern = Math.floor(Math.random()*chArray.length);

console.log(randomChPatern)

var ohArray = [
    '---x------x---',
    'x-----x-x---x---',
    'x-------x-------',
    'x---------------'
];

var randomOhPatern = Math.floor(Math.random()*ohArray.length);

console.log(randomOhPatern)

var chArray = [
    '--x---x---x---x-',
    'xxxxxxxxxxxxxxxx',
    '-x-xxxx-xx-xx-xx',
    '--x---x---x-xxxx',
    '--x-------x-----'
];

var randomChPatern = Math.floor(Math.random()*chArray.length);


var clavArray = [
    '---x--xx---x--xx',
    '--------------xx',
    '--------x-------'
];

var randomClPatern = Math.floor(Math.random()*clavArray.length);


var marArray = [
    '--x---x---x---x-',
    '-xx--xxxxxx-x-xx',
    '--------x-------'
];

var randomMarPatern = Math.floor(Math.random()*marArray.length);



var clapArray = [
    '-----------x----',
    '--------------x-',
    '----x---x------x'
];

var randomCPPatern = Math.floor(Math.random()*clapArray.length);


var snareArray = [
    '----x------x----',
    '------x-------x-',
    '---xx---x-----xx',
    '-----------x----',
    '--------------x-'
];

var randomSnarePatern = Math.floor(Math.random()*snareArray.length);


var kickArray = [
    'x---x---x---x---',
    'x---x---x---x--x',
    'x--x--x-------x-',
    'x--x---x--xx----',
    '---x--x-x---xxxx'
];

var randomKickPatern = Math.floor(Math.random()*kickArray.length);



const ptn = 'xxxx'.repeat(7);
const A = 'xxx[x[RR]]';
const B = 'xx[x[RR]][x[RR]]';
const C = 'x-[x[RR]]';

const kick = scribble.clip({
  pattern: kickArray[randomKickPatern],
  notes: 'c4',
});

//scribble.midi(kick, 'kick.mid');
let midikick = scribble.midi(kick, null);


const ch = scribble.clip({
  pattern: chArray[randomChPatern],
  notes: 'c4',
  sizzle: 'sin',
  sizzleReps: 32,
});

//scribble.midi(ch, 'ch.mid');
let midich = scribble.midi(ch, null);


const bass = scribble.clip({
  notes: 'Bb2',
  pattern: '[-xRx][-xRR][-xRx][-xxR]'.repeat(2),
  randomNotes: scribble.scale('Bb2 minor').slice(1),
  accent: '--x-',
});

let midisbass = scribble.midi(bass, null);


const bassEnd = scribble.clip({
  notes: 'G#2',
  pattern: '[-xRx][-xRR][-xRx][-xxR]'.repeat(20),
  randomNotes: scribble.scale('Bb2 harmonic minor').slice(2, 5),
  accent: '--x-',
});

//scribble.midi(bass.concat(bassEnd), 'bass.mid');
let midisbassEnd = scribble.midi(bassEnd, null);


const sA = '-x-x';
const sB = '-[xR]-[Rx]';

const snare = scribble.clip({
  notes: 'c4',
  pattern: snareArray[randomSnarePatern],
});



//scribble.midi(snare, 'snare.mid');
let midisnare = scribble.midi(snare, null);


const clav = scribble.clip({
  notes: 'c4',
  pattern: clavArray[randomClPatern],
});



//scribble.midi(snare, 'snare.mid');
let midiclav = scribble.midi(clav, null);




const mar = scribble.clip({
  notes: 'c4',
  pattern: marArray[randomMarPatern],
});



//scribble.midi(snare, 'snare.mid');
let midimar = scribble.midi(mar, null);



const oh = scribble.clip({
  notes: 'c4',
  pattern: ohArray[randomOhPatern],
});


let midiData = scribble.midi(oh, null);

//let midiData1 = scribble.midi(oh);


  console.log("check bytes : "+midiData)

   let midiconvertsnare = MidiConvert.parse(midisnare)
   let midiconvertsoh = MidiConvert.parse(midisnare)
   let mindiconvertclav = MidiConvert.parse(midiclav)
   let mindiconvertmar = MidiConvert.parse(midimar)

   let midiconvertbass = MidiConvert.parse(midisbass)
   let midiconvertbassend = MidiConvert.parse(midisbassEnd)
   let midiconvertch = MidiConvert.parse(midich)
   let midiconvertkick = MidiConvert.parse(midikick)

  // console.log(midiconvert)

  // console.log("midi converted")

  let obj = {
   oh:midiconvertsoh, 
   snare : midiconvertsnare,
   bass:midiconvertbass,
   bassend:midiconvertbassend,
   ch:midiconvertch,
   kick:midiconvertkick,
   clav:mindiconvertclav,
   mar: mindiconvertmar}

  return obj;
};



// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); //here configure your origin pointing to your app
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

 app.get('/midi.json', function(req, res) {
      res.statusCode = 200;
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.setHeader("Content-Type", "application/json");
      const jsonString = JSON.stringify(createMidiForToneJs("CM", "xxxxxxx"));
      res.end(jsonString);
 });

   app.get('/ch/CH1.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/CH1.wav'));
   });

    app.get('/ch/CH2.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/CH2.wav'));

     });

      app.get('/ch/CH3.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/CH3.wav'));
     });


        app.get('/kick1.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/kick1.wav'));
 });

      app.get('/kick2.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/kick2.wav'));
    });

       app.get('/kick3.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/kick3.wav'));
    });

          app.get('/kick4.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/kick4.wav'));
    });

      app.get('/kick5.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/kick5.wav'));
    });

        app.get('/clap1.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/clap1.wav'));
    });


    app.get('/clap2.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/clap2.wav'));
    });

     app.get('/clap3.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/clap3.wav'));
    });

      app.get('/clav1.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/clav1.wav'));
    });

        app.get('/CYM1.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/CYM1.wav'));
    });

           app.get('/CYM2.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/CYM2.wav'));
    });

               app.get('/CYM2.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/CYM2.wav'));
    });

     app.get('/MAR1.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/MAR1.wav'));
    });


        app.get('/MAR2.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/MAR2.wav'));
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


   app.get('/sd/E808_SD-09.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/[SD]/E808_SD-09.wav'));
   });


   app.get('/sd/E808_BDs-06.wav', function(req, res) {
  
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

        res.sendFile(path.join(__dirname, './Hits', '/[BD]/E808_BDs-06.wav'));
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
