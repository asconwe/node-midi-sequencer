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

module.exports = {
  incrementMultiplier,
  incrementN,
  decrementMultiplier,
  decrementN,
};
