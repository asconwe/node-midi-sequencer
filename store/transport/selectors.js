const { createSelector } = require('reselect');

const selectCurrentIndex = state => state.transport.selectCurrentIndex;
const selectIsPlaying = state => state.transport.selectIsPlaying;
const selectTempo = state => state.transport.tempo;

const baseStep = 256;

// bpm = tempo
// minutesPerBeat = 1 / bpm
// secondsPerBeat = 60 / bpm
// msPerBeat = 60 * 1000 / bpm
// stepsPerBeat = 256 / 4
// msPerStep = msPerBeat / stepsPerBeat

const msPerBaseStep = createSelector(
  selectTempo,
  (tempo) => {
    const msPerBeat = 60 * 1000 / tempo;
    const stepsPerBeat = baseStep / 4;
    return msPerBeat / stepsPerBeat;
  }
)

module.exports = {
  selectIsPlaying,
  selectCurrentIndex,
}