const logger = require('../../../utils/logger');
const { selectBaseStepsPerBeat } = require('../../transport/selectors');

const selectTrack = (state, index) => state.routes[index];
const selectTrackTimelineLength = (state, index) => {
  const { n, multiplier } = state.routes[index];
  const baseStepsPerBeat = selectBaseStepsPerBeat(state);
  return baseStepsPerBeat * Math.pow(2, n) * multiplier;
};
const selectNewTrackTimelineData = (state, index, { newN, newMultiplier }) => {
  const baseStepsPerBeat = selectBaseStepsPerBeat(state);
  const { n, multiplier } = state.routes[index];
  const newTimelineLength = baseStepsPerBeat * Math.pow(2, (newN || n)) * (newMultiplier || multiplier);
  const currentTimelineLength = selectTrackTimelineLength(state, index);
  const product = newTimelineLength / currentTimelineLength;
  const currentTimeline = selectTrack(state, index).messages;
  const timelineIndexes = Object.keys(currentTimeline);
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

module.exports = {
  selectTrack,
  selectTrackTimelineLength,
  selectNewTrackTimelineData,
};
