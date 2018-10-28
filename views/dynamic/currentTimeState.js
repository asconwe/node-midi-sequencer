const colors = require('colors');
const logger = require('../../utils/logger');
const nLongString = require('../../utils/nLongString');

const tempoStateView = (time, stepsPerBeat) => {
  const beatDecimal = (time / stepsPerBeat).toFixed(2);
  const percentageRemainder = beatDecimal.toString().split('.').pop();
  const cumulativeBeat = Math.trunc(beatDecimal);
  const beat = cumulativeBeat % 4;
  const measure = Math.trunc(cumulativeBeat / 4);
  return `Time: ${colors.green(measure)}:${colors.green(beat)}.${colors.green(percentageRemainder)}`;
};

module.exports = tempoStateView;
