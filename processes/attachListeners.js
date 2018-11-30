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
  const { controlKnob, controlButton } = selectControls(state);
  ports.inputs.forEach((input) => {
    // If this input has any listeners
    if (listeners[input.id] && listeners[input.id].length > 0) {
      input.onmidimessage = (event) => {
        const parsedEvent = MIDIMessage(event);
        if (
          (parsedEvent._event.currentTarget.id === controlButton.id
            && parsedEvent.controllerNumber == controlButton.controllerNumber)
        ) {
          logger.info('first');
          return listeners[controlButton.id][1](parsedEvent);
        }
        if (
          (parsedEvent._event.currentTarget.id === controlKnob.id
            && parsedEvent.controllerNumber == controlKnob.controllerNumber)
        ) {
          logger.info('second');
          if (controlKnob.id === controlButton.id) return listeners[controlKnob.id][0](parsedEvent);
          logger.info('third');
          return listeners[controlKnob.id][1](parsedEvent);
        }
        return callCombinedListeners(listeners[input.id], parsedEvent);
      };
    }
  });
};

module.exports = attachListeners;
