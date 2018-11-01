const constants = require('./constants');

const incrementMultiplier = () => ({
  type: constants.INCREMENT_MULTIPLIER,
});

const incrementN = () => ({
  type: constants.INCREMENT_N,
});

const decrementMultiplier = () => ({
  type: constants.DECREMENT_MULTIPLIER,
});

const decrementN = () => ({
  type: constants.DECREMENT_N,
});

const doubleRecordingQuantization = () => ({
  type: constants.DOUBLE_RECORDING_QUANTIZATION,
});

const halveRecordingQuantization = () => ({
  type: constants.HALVE_RECORDING_QUANTIZATION,
});

const arm = () => ({
  type: constants.ARM,
});

const disarm = () => ({
  type: constants.DISARM,
});

const addMessage = (message, step) => ({
  type: constants.ADD_MESSAGE,
  message,
  step,
});

const updateRoute = update => ({
  type: constants.UPDATE,
  update,
});

module.exports = {
  incrementMultiplier,
  incrementN,
  decrementMultiplier,
  decrementN,
  arm,
  disarm,
  addMessage,
  halveRecordingQuantization,
  doubleRecordingQuantization,
  updateRoute,
};
