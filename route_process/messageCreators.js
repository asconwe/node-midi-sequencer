const constants = require('./messageConstants');

const getMidiMessages = position => ({
  type: constants.toRouteProcess.GET_MIDI_MESSAGES,
  position,
});

const sendMidiMessage = midiMessage => ({
  type: constants.toMainProcess.SEND_MIDI_MESSAGE,
  midiMessage,
});

const sendState = state => ({
  type: constants.toMainProcess.SEND_STATE,
  state,
});

const dispatch = action => ({
  type: constants.toRouteProcess.DISPATCH,
  action,
});

const getState = () => ({
  type: constants.toRouteProcess.GET_STATE,
});

const setMidiMessage = (midiMessage, step) => ({
  type: constants.toRouteProcess.SET_MIDI_MESSAGE,
  midiMessage,
  step,
});

module.exports = {
  toMainProcess: {
    sendMidiMessage,
    sendState,
  },
  toRouteProcess: {
    getMidiMessages,
    setMidiMessage,
    dispatch,
    getState,
  },
};
