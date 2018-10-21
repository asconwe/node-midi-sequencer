const colors = require('colors');
const nLongString = require('../../utils/nLongString');

const tempoStateView = tempo => `Tempo: ${colors.green(nLongString(4, `${tempo}`))}`;

module.exports = tempoStateView;
