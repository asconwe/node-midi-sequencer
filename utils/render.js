const readline = require('readline');
const logger = require('./logger');
const store = require('../store');
const observeStore = require('../store/observeStore');
const { selectView } = require('../store/view/selectors');
const { throttle } = require('lodash');
const errorView = require('../views/error');

const out = process.stdout;

/**
 * Clear display and render string as new view
 * @param {string} view The full view to be rendered
 */
const render = (view) => {
  if (!view) return render(errorView(new Error('no view provided')));
  logger.info('rendering view');
  readline.cursorTo(out, 0, 0);
  readline.clearScreenDown(out);
  return process.stdout.write(`${view}\n`);
};

const throttleRender = throttle(render, 100);

module.exports = () => {
  observeStore(
    store,
    selectView,
    (view) => {
      if (view) {
        throttleRender(view);
      }
    },
  );
};
