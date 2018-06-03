const { requestMIDIAccess } = require('web-midi-api');

const store = require('../../store')
const { applyMIDIAccess } = require('../../store/MIDI-access/actionCreators');

module.exports = async () => {
  try {
    const MIDIAccess = await requestMIDIAccess()
    store.dispatch(applyMIDIAccess(MIDIAccess));
  } catch (error) {
    throw new Error(`
      Could not start Sequencer.
      MIDI Access was denied due to the error:
      ${error}
    `)
  }
}