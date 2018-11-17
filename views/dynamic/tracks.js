const colors = require('colors');
const logger = require('../../utils/logger');
const nLongString = require('../../utils/nLongString');

const trackStateView = (track, index, currentStep, baseStepsPerBeat) => {
  const {
    n, multiplier, armed, recordingMode, quantization,
  } = track;
  const timelineLength = Math.pow(2, n) * multiplier;
  const m = Math.trunc(timelineLength / 4);
  const b = timelineLength % 4;

  const recQString = colors.green(`1/${64 / quantization.recording}`);

  const timelineIllustration = [];
  for (let i = 0; i < timelineLength; i++) {
    if (Math.trunc(currentStep / baseStepsPerBeat) % timelineLength === i) {
      timelineIllustration.push('+');
    } else {
      timelineIllustration.push('-');
    }
  }

  return `\nT${nLongString(2, index.toString())} -- ${armed ? colors.red(nLongString(10, 'armed')) : colors.green(nLongString(10, 'disarmed'))} -- length: ${colors.green(m)}m ${colors.green(b)}b -- recording mode: ${colors.green(recordingMode)} -- recording quantization: ${recQString}\nposition: |${timelineIllustration.join('')}|`;
};

const tracksView = (tracks, currentStep, baseStepsPerBeat) => tracks.reduce((str, track, index) => `${str}${trackStateView(track, index, currentStep, baseStepsPerBeat)}`, '');

module.exports = tracksView;
