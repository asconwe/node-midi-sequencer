const logger = require('../../../utils/logger');
const store = require('../../../store');
const observeStore = require('../../../store/observeStore');
const { renderView } = require('../../../store/view/actionCreators');
const homeView = require('../../../views/dynamic/home');
const selectHomeViewComponents = require('./selectHomeViewComponents');
const { setMenuItems, setMenuTitle, saveMenuAsPrevious } = require('../../../store/menus/actionCreators');
const renderTempoMenu = require('./tempo');

const handleChange = (homeViewComponents) => {
  try {
    logger.info('homeview components', homeViewComponents);
    store.dispatch(renderView(homeView(homeViewComponents)));
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

const populateDefaultHomeView = () => {
  store.dispatch(setMenuItems([{
    name: 'set tempo',
    pressReleaseAction: () => {
      store.dispatch(saveMenuAsPrevious());
      renderTempoMenu();
    },
  }]));
  store.dispatch(setMenuTitle('home'));
};

module.exports = (populateHomeView = populateDefaultHomeView) => {
  populateHomeView();
  observeStore(
    store,
    selectHomeViewComponents,
    handleChange,
  );
};
