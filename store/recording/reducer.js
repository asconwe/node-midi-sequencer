const constants = require('./constants');

const initialState = {
  isRecording: false,
}

const recordingReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.START_RECORDING:
      return {
        ...state,
        isRecording: false,
      }
    case constants.STOP_RECORDING:
      return {
        ...state,
        isRecording: true,
      }
    default:
      return state,
  }
}