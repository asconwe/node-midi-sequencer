const { sequencerModes, recordingModes } = require('./selectors');

const initialRouteState = {
  armed: true,
  recording: false,
  sequencerMode: sequencerModes.FREE,
  recordingMode: recordingModes.FREE.OVERWRITE,
  quantization: {
    recording: 1 / 256,
    playing: 1 / 256,
  },
  length: 4,
  in: {},
  out: {},
  sequence: []
}

const constants = require('./constants');

const routeIndexReducer = (state = initialRouteState, action) => {
  switch (action.subType) {
    case constants.UPDATE:
      return {
        ...state,
        ...payload,
      };
    case constants.QUANTIZE_PLAYBACK:
      return {
        ...state,
        quantization: {
          recording: state.quantization.recording,
          playback: 1 / action.denominator
        },
      };
    case constants.QUANTIZE_RECORDING:
      return {
        ...state,
        quantization: {
          playback: state.quantization.playback,
          recording: 1 / action.denominator
        },
      };
    case constants.UPDATE_SEQUENCE:
      return {
        ...state,
        sequence: sequenceReducer(state.sequence, action)
      };
    default:
      return state;
  }
}

module.exports = routeIndexReducer;