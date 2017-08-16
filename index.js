const navigator = require('web-midi-api');
const testOutputs = require('./modules/testOutputs');
const testInputs = require('./modules/testInputs');
const { stopOutputs, stopInputs } = require('./modules/panic');

let midi;
let inputs;
let outputs;

function onMIDIFailure(msg){
  console.log('Failed to get MIDI access - ' + msg);
  process.exit(1);
}

function onMIDISuccess(midiAccess){
  midi = midiAccess;
  inputs = midi.inputs;
  outputs = midi.outputs;
  testOutputs();
  stopOutputs();
  testInputs();
  stopInputs();
  initLooper()
      .then((err, config) => {
          startLooper(config);
      });
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);