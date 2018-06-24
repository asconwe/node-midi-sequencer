const MIDIMessage = require('midimessage')
const store = require('../store');

const attachListeners = () => {
  const state = store.getState();
  const { listeners, ports } = state;
  ports.inputs.forEach((input) => {
    input.onmidimessage = (event) => {
      if (listeners[input.id] && listeners[input.id].length > 0) {
        const parsedEvent = MIDIMessage(event);
        callCombinedListeners(listeners[input.id], parsedEvent);
      }
    };
  });
}

const callCombinedListeners = (listeners, parsedEvent) => {
  listeners.forEach(listener => listener(parsedEvent))
}

module.exports = attachListeners;