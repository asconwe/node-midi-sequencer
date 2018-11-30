const constants = require('./constants');

const initialState = {
  recording: 1, // 1 step
  playing: 1, // 1 step
};

const routeIndexReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case constants.QUANTIZE_PLAYBACK:
      return {
        ...state,
        playback: 1 / action.denominator,
      };
    case constants.QUANTIZE_RECORDING:
      return {
        ...state,
        recording: 1 / action.denominator,
      };
    case constants.DOUBLE_RECORDING_QUANTIZATION:
      return {
        ...state,
        recording: state.recording < 64
          ? state.recording * 2
          : state.recording,
      };
    case constants.HALVE_RECORDING_QUANTIZATION:
      return {
        ...state,
        recording: state.recording > 1
          ? state.recording / 2
          : state.recording,
      };
    default:
      return {
        ...state,
      };
  }
};

module.exports = routeIndexReducer;
