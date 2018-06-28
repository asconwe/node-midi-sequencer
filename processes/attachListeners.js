const MIDIMessage = require('midimessage');
const logger = require('../utils/logger');
const store = require('../store');
const { selectControls } = require('../store/userControl/selectors');

const callCombinedListeners = (listeners, parsedEvent) => {
  listeners.forEach(listener => listener(parsedEvent));
};

const attachListeners = () => {
  const state = store.getState();
  const { listeners, ports } = state;
  const { knob, button } = selectControls(state);
  ports.inputs.forEach((input) => {
    input.onmidimessage = (event) => {
      if (listeners[input.id] && listeners[input.id].length > 0) {
        const parsedEvent = MIDIMessage(event);
        // If is sequencer control knob or button, call first listener only
        if (
          (parsedEvent._event.currentTarget.id === knob.id
            || parsedEvent._event.currentTarget.id === button.id)
          && (parsedEvent.controllerNumber == knob.controllerNumber
            || parsedEvent.controllerNumber == button.controllerNumber)
        ) {
          if (knob.id === button.id) listeners[input.id][1](parsedEvent);
          return listeners[input.id][0](parsedEvent);
        }
        return callCombinedListeners(listeners[input.id], parsedEvent);
      }
    };
  });
};

module.exports = attachListeners;
