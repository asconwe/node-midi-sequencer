const colors = require('colors');
const logger = require('../../utils/logger');
const nLongString = require('../../utils/nLongString');

const trackStateView = (timeline, index, currentStep, baseStepsPerBeat) => {
  const { n, multiplier } = timeline;
  const timelineLength = Math.pow(2, n) * multiplier;
  const m = Math.trunc(timelineLength / 4);
  const b = timelineLength % 4;
  const armed = false;

  const timelineIllustration = [];
  for (let i = 0; i < timelineLength; i++) {
    if (Math.trunc(currentStep / baseStepsPerBeat) % timelineLength === i) {
      timelineIllustration.push('+');
    } else {
      timelineIllustration.push('-');
    }
  }

  return `\nT${nLongString(2, index.toString())} -- ${armed ? colors.red(nLongString(10, 'armed')) : nLongString(10, 'disengaged')} -- length: ${colors.green(m)}m ${colors.green(b)}b \nposition: |${timelineIllustration.join('')}|`;
};

const tracksView = (tracks, currentStep, baseStepsPerBeat) => {
  logger.info(JSON.stringify(tracks));
  return tracks.reduce((str, timeline, index) => `${str}${trackStateView(timeline, index, currentStep, baseStepsPerBeat)}`, '');
};

module.exports = tracksView;
