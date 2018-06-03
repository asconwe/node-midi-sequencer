const constants = require('./constants');

const MIDIAccessReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.APPLY:
      return action.MIDIAccess;
  
    default:
      return state;
  }
}

module.exports = MIDIAccessReducer;