const constants = require('./constants');
const getIfPresent = require('../../../utils/getIfPresent');

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
    recording: 1, // 1 step
    playing: 1, // 1 step
  },
  length: 4,
  in: {},
  out: {},
  outputPort: {},
};

const routeIndexReducer = (state = initialRouteState, action = {}) => {
  switch (action.type) {
    case constants.UPDATE:
      return {
        ...state,
        ...action.update,
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
    case constants.DOUBLE_RECORDING_QUANTIZATION:
      return {
        ...state,
        quantization: {
          ...state.quantization,
          recording: state.quantization.recording < 64
            ? state.quantization.recording * 2
            : state.quantization.recording,
        },
      };
    case constants.HALVE_RECORDING_QUANTIZATION:
      return {
        ...state,
        quantization: {
          ...state.quantization,
          recording: state.quantization.recording > 1
            ? state.quantization.recording / 2
            : state.quantization.recording,
        },
      };
    case constants.ARM:
      return {
        ...state,
        armed: true,
      };
    case constants.DISARM:
      return {
        ...state,
        armed: false,
      };
    case constants.INCREMENT_MULTIPLIER:
      return {
        ...state,
        multiplier: state.multiplier + 1,
      };
    case constants.INCREMENT_N:
      return {
        ...state,
        n: state.n + 1,
      };
    case constants.DECREMENT_MULTIPLIER:
      return {
        ...state,
        multiplier: state.multiplier > 1 ? state.multiplier - 1 : state.multiplier,
      };
    case constants.DECREMENT_N:
      return {
        ...state,
        n: state.n > 1 ? state.n - 1 : state.n,
      };
    case constants.ADD_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.step]: getIfPresent(
            () => state.messages[action.step].concat(action.message),
            [action.message],
          ),
        },
      };
    case constants.CLEAR_TIMELINE:
      return {
        ...state,
        messages: {},
      };
    case constants.REPLACE_TIMELINE:
      return {
        ...state,
        messages: action.messages,
      };
    default:
      return {
        ...initialRouteState,
        ...state,
      };
  }
};

module.exports = routeIndexReducer;
