const { createSelector } = require('reselect');
const logger = require('../../../utils/logger');
const store = require('../../../store');
const observeStore = require('../../../store/observeStore');
const { selectTransportPosition } = require('../../../store/transport/selectors');
const { selectSequenceLength } = require('../../../store/recording/selectors');

const selectPlaybackPosition =  module.exports = () => observeStore(
    store,
    selectTransportPosition,
    (selectPlaybackPosition) => {

    },
  );
