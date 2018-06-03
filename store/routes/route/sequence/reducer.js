const constants = require('./constants');

const initialSequenceState = []

const sequenceReducer = (state = initialSequenceState, action) => {
  switch (action.subSubType) {
    case constants.ADD_AT_INDEX:
      return replaceIndex(
        state,
        action.index,
        state[action.index].concat(action.event)
      )
    case constants.REPLACE_AT_INDEX:
      return replaceIndex(
        state,
        action.index,
        action.event
      )
    default:
      return state;
  }
}

const replaceIndex = (arr, index, replacement) => ([
  ...arr.slice(0, index),
  replacement,
  ...arr.slice(index + 1)
])

module.exports = sequenceReducer;