const { createSelector } = require('reselect');
const { selectLength } = require('../length/selectors');

const selectMessages = state => state.messages.messages;

const selectMessageIndexes = createSelector(
  selectMessages,
  messages => Object.keys(messages),
);

// Reselect isn't really useful here until there is playback quantization
// At that point, add the quantization range to the selector
const indexedSelectors = {};
const selectMessagesForPlayback = (state, position) => {
  if (!indexedSelectors[position]) {
    indexedSelectors[position] = createSelector(
      selectLength,
      selectMessages,
      (length, messages) => messages[position % length],
    );
  }
  return indexedSelectors[position](state);
};


module.exports = {
  selectMessages,
  selectMessageIndexes,
  selectMessagesForPlayback,
};
