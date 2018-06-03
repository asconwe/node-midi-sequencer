const constants = require('./constants');

const applyMIDIAccess = (MIDIAccess) => ({
  type: constants.APPLY,
  MIDIAccess,
})

module.exports = {applyMIDIAccess};