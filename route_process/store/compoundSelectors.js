const { selectBaseStepsPerBeat } = require('../../store/transport/selectors');
const { selectLength } = require('./length/selectors');
const { selectMessageIndexes } = require('./messages/selectors');

const selectNewTrackTimelineData = (state, index, { newN, newMultiplier }) => {
  const baseStepsPerBeat = selectBaseStepsPerBeat(state);
  const { n, multiplier } = state.routes[index];
  const newTimelineLength = baseStepsPerBeat * (2 ** (newN || n)) * (newMultiplier || multiplier);
  const currentTimelineLength = selectLength(state, index);
  const product = newTimelineLength / currentTimelineLength;
  const timelineIndexes = selectMessageIndexes(state);
  return timelineIndexes.reduce((acc, messageIndex) => {
    const parsedMessageIndex = parseInt(messageIndex, 10);
    const newMessages = {};
    for (let i = 0; i < product; i++) {
      if (parsedMessageIndex + (currentTimelineLength * i) < newTimelineLength) {
        newMessages[parsedMessageIndex + (currentTimelineLength * i)] = currentTimeline[parsedMessageIndex];
      }
    }
    return {
      ...acc,
      ...newMessages,
    };
  }, {});
};

module.exporst = {
  selectNewTrackTimelineData,
};
