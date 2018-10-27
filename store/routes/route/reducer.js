const constants = require('./constants');

const { sequencerModes, recordingModes } = constants;

const initialRouteState = {
  // base unit is 1 beat
  // length is base unit * (2 to the n power) * multiplier
  n: 4,
  multiplier: 1,
  messages: {},
  // good spot for history
  armed: false,
  sequencerMode: sequencerModes.FREE,
  recordingMode: recordingModes.FREE.OVERWRITE,
  quantization: {
    recording: 1 / 256,
    playing: 1 / 256,
  },
  length: 4,
  in: {},
  out: {},
};

const routeIndexReducer = (state = initialRouteState, action = {}) => {
  switch (action.subType) {
    case constants.UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    case constants.QUANTIZE_PLAYBACK:
      return {
        ...state,
        quantization: {
          recording: state.quantization.recording,
          playback: 1 / action.denominator,
        },
      };
    case constants.QUANTIZE_RECORDING:
      return {
        ...state,
        quantization: {
          playback: state.quantization.playback,
          recording: 1 / action.denominator,
        },
      };
    default:
      return {
        ...initialRouteState,
        ...state,
      };
  }
};

module.exports = routeIndexReducer;
