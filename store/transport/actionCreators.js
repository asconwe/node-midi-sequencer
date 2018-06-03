const constants = require('./constants');
const { selectCurrentIndex } = require('./selectors')
const store = require('../../store');

const getCurrentIndex = () => {
  const state = store.getState();
  return selectCurrentIndex(state);
}

advanceTransportToNext = (noteLength) => {
  const currentIndex = getCurrentIndex();
  const calculatedLength = 256 * noteLength;
  const diff = calculatedLength - (currentIndex % calculatedLength);
  const newCurrentIndex = currentIndex + diff
  return ({
    type: constants.UPDATE,
    currentIndex: newCurrentIndex,
  })
}

retreatTransportToPrevious = (duration) => {
  const currentIndex = getCurrentIndex();
  const calculatedLength = 256 * noteLength;
  const diff = (currentIndex % calculatedLength);
  const newCurrentIndex = currentIndex - diff
  return ({
    type: constants.UPDATE,
    currentIndex: newCurrentIndex,
  })
}

module.exports = {
  advanceTransportToNext,
  retreatTransportToPrevious
}

