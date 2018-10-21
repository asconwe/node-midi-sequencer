const { createSelector } = require('reselect');

const selectCurrentIndex = state => state.transport.currentIndex;
const selectIsPlaying = state => state.transport.playing;
const selectTempo = state => state.transport.tempo;
const selectDidTick = state => state.transport.tick;
const baseStep = 256;

const selectUsPerBaseStep = createSelector(
  selectTempo,

  (tempo) => {
    const usPerBeat = 60 * 1000 * 1000 / tempo;
    const stepsPerBeat = baseStep / 4;
    return usPerBeat / stepsPerBeat;
  },
);

module.exports = {
  selectUsPerBaseStep,
  selectIsPlaying,
  selectCurrentIndex,
  selectDidTick,
  selectTempo,
};
