const logger = require('../../utils/logger');

const store = require('../../store');
const { setMenuItems, setMenuTitle } = require('../../store/menus/actionCreators');
const { renderDerivedMenu } = require('../../store/view/actionCreators');
const { reloadAction: reload } = require('../../store/reload');
const getIfPresent = require('../../utils/getIfPresent');
const oldStateJSON = getIfPresent(() => require('../../logs/state.json'));

const queryIfReload = async () => new Promise((resolve, reject) => {
  try {
    const menuItems = [{
      name: 'Yes',
      pressReleaseAction: () => resolve(true),
    }, {
      name: 'No',
      pressReleaseAction: () => resolve(false),
    }];
    store.dispatch(setMenuTitle('Would you like to reload state from last time?'));
    store.dispatch(setMenuItems(menuItems));
    store.dispatch(renderDerivedMenu());
  } catch (error) {
    reject(error);
  }
});

const reloadConfig = async () => {
  logger.info('relaod config');
  const doReload = await queryIfReload();
  if (doReload) {
    const oldState = oldStateJSON;
    store.dispatch(reload(oldState));
  }
  return doReload;
};

module.exports = reloadConfig;
