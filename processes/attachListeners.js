const MIDIMessage = require('midimessage');
const logger = require('../utils/logger');
const store = require('../store');
const { selectControls } = require('../store/userControl/selectors');

const callCombinedListeners = (listeners, parsedEvent) => {
  try {
    listeners.forEach(listener => listener(parsedEvent));
  } catch (thrown) {
    // if it is not an interjection, it is an error.
    if (!thrown.interjection) {
      logger.info('caught');
      throw thrown;
    }
  }
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
        return callCombinedListeners(listeners[input.id], parsedEvent);
      };
    }
  });
};

module.exports = attachListeners;
