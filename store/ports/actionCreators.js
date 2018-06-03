const constants = require('./constants');

/**
 * Create a REPLACE_ALL redux action
 * @param {{ inputs: *, outputs: *}} ports Describes all available inputs and outputs
 * @returns {{ type: string, inputs: * outputs: * }} A redux action
 */
const replaceAllPorts = ({ inputs, outputs }) => ({
  type: constants.REPLACE_ALL,
  inputs,
  outputs,
})

module.exports = {
  replaceAllPorts,
}
