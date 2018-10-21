const colors = require('colors');
const nLongString = require('../../utils/nLongString');

const transportStateView = isPlaying => `Transport: ${colors.green(nLongString(7, isPlaying ? 'playing' : 'paused'))}`;

module.exports = transportStateView;
