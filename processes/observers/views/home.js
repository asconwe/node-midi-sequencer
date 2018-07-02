const logger = require('../../../utils/logger');
const store = require('../../../store');
const observeStore = require('../../../store/observeStore');
const { renderView } = require('../../../store/view/actionCreators');
const homeView = require('../../../views/dynamic/home');
const selectHomeViewComponents = require('./selectHomeViewComponents');
const { setMenuItems, setMenuTitle } = require('../../../store/menus/actionCreators');

const handleChange = (homeViewComponents) => {
  try {
    store.dispatch(renderView(homeView(homeViewComponents)));
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

module.exports = () => {
  store.dispatch(setMenuItems([]));
  store.dispatch(setMenuTitle('home'));
  observeStore(
    store,
    selectHomeViewComponents,
    handleChange,
  );
};
