const constants = require('./constants');

const doubleRecordingQuantization = () => ({
  type: constants.DOUBLE_RECORDING_QUANTIZATION,
});

const halveRecordingQuantization = () => ({
  type: constants.HALVE_RECORDING_QUANTIZATION,
});

module.exports = {
  doubleRecordingQuantization,
  halveRecordingQuantization,
};
