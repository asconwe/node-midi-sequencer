const fs = require('fs');
const logger = require('./logger');
const store = require('../store');
const observeStore = require('../store/observeStore');
const { throttle } = require('lodash');

const writeToFile = (state) => {
  fs.writeFile(`${__dirname}/../logs/state.json`, JSON.stringify(state, null, 2), (error) => {
    if (error) {
      logger.error(error);
    }
    return null;
  });
};

const throttledWriteToFile = throttle(writeToFile, 1000);

module.exports = () => observeStore(
  store,
  state => state,
  (state) => {
    throttledWriteToFile(state);
  },
);
