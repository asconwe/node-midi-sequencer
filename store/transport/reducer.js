const constants = require('./constants');

const initialState = {
  currentIndex: 0,
  playing: false,
  tempo: 120,
}

const transportReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.UPDATE:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}