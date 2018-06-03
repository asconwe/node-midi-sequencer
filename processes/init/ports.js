const store = require('../../store');
const { replaceAllPorts } = require('../../store/ports/actionCreators')

const initMIDIPorts = () => {
  const { inputs, outputs } = store.getState().MIDIAccess
  const handleConfigFailure = (msg) => {
    throw new Error('Failed to start sequencer - ' + msg);
  }

  const inputsAvailable = inputs.size > 0;
  const outputsAvailable = outputs.size > 0;

  if (!inputsAvailable && !outputsAvailable) return handleConfigFailure('No MIDI ports available');
  if (!inputsAvailable) return handleConfigFailure('No MIDI inputs available');
  if (!outputsAvailable) return handleConfigFailure('No MIDI inputs available');

  store.dispatch(replaceAllPorts({
    inputs,
    outputs,
  }));
}

module.exports = initMIDIPorts;