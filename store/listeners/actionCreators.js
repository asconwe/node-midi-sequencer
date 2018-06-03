const constants = require('./constants');

/**
 * Create an ADD action
 * @param {{ id: string, listener: function }} taggedListener The id and listener function to be added
 * @returns {{ type: string, id: string, listener: function }} A redux action
 */
addMIDIListener = ({ id, listener }) => ({
  type: constants.ADD,
  id,
  listener
})

module.exports = {
  addMIDIListener
}
