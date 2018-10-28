const constants = require('./constants');

const incrementMultiplier = () => ({
  type: constants.INCREMENT_MULTIPLIER,
});

const incrementN = () => ({
  type: constants.INCREMENT_N,
});

const decrementMultiplier = () => ({
  type: constants.DECREMENT_MULTIPLIER,
});

const decrementN = () => ({
  type: constants.DECREMENT_N,
});

const arm = () => ({
  type: constants.ARM,
});

const disarm = () => ({
  type: constants.DISARM,
});

const addMessage = (message, step) => ({
  type: constants.ADD_MESSAGE,
  message,
  step,
});

module.exports = {
  incrementMultiplier,
  incrementN,
  decrementMultiplier,
  decrementN,
  arm,
  disarm,
  addMessage,
};
