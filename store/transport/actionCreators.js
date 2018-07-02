const constants = require('./constants');
const { selectCurrentIndex } = require('./selectors');
const store = require('../../store');

const getCurrentIndex = () => {
  const state = store.getState();
  return selectCurrentIndex(state);
};

const advanceTransportToNext = (noteLength) => {
  const currentIndex = getCurrentIndex();
  const calculatedLength = 256 * noteLength;
  const diff = calculatedLength - (currentIndex % calculatedLength);
  const newCurrentIndex = currentIndex + diff;
  return ({
    type: constants.UPDATE,
    currentIndex: newCurrentIndex,
  });
};

const retreatTransportToPrevious = (duration) => {
  const currentIndex = getCurrentIndex();
  const calculatedLength = 256 * noteLength;
  const diff = (currentIndex % calculatedLength);
  const newCurrentIndex = currentIndex - diff;
  return ({
    type: constants.UPDATE,
    currentIndex: newCurrentIndex,
  });
};

const advanceOneTick = () => {
  const currentIndex = getCurrentIndex();
  return ({
    type: constants.UPDATE,
    currentIndex: currentIndex + 1,
  });
};

const update = payload => ({
  type: constants.UPDATE,
  payload,
});

const toggleTransport = () => ({
  type: constants.TOGGLE,
});

module.exports = {
  advanceOneTick,
  advanceTransportToNext,
  retreatTransportToPrevious,
  update,
  toggleTransport,
};
