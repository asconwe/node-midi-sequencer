const { createSelector } = require('reselect');

const selectCurrentIndex = state => state.transport.currentIndex;
const selectIsPlaying = state => state.transport.playing;
const selectTempo = state => state.transport.tempo;

const baseStep = 256;

const msPerBaseStep = createSelector(
  selectTempo,
  (tempo) => {
    const msPerBeat = 60 * 1000 / tempo;
    const stepsPerBeat = baseStep / 4;
    return msPerBeat / stepsPerBeat;
  }
)

module.exports = {
  msPerBaseStep,
  selectIsPlaying,
  selectCurrentIndex,
}