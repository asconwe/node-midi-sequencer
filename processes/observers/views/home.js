const logger = require('../../../utils/logger');
const store = require('../../../store');
const observeStore = require('../../../store/observeStore');
const { renderView } = require('../../../store/view/actionCreators');
const homeView = require('../../../views/dynamic/home');
const selectHomeViewComponents = require('./selectHomeViewComponents');
const { setMenuItems, setMenuTitle, saveMenuAsPrevious } = require('../../../store/menus/actionCreators');
const renderTempoMenu = require('./tempo');
const { clearInterceptor, setInterceptorWithVelocity } = require('../../../store/knobs/actionCreators');
const { tempoUp, tempoDown } = require('../../../store/transport/actionCreators');

const handleChange = (homeViewComponents) => {
  try {
    store.dispatch(renderView(homeView(homeViewComponents)));
  } catch (error) {
    logger.error(error.message);
    throw error;
  }
};

const populateDefaultHomeView = () => {
  const { dispatch } = store;
  const dispatchThunk = action => () => {
    dispatch(action);
  };
  dispatch(setMenuItems([{
    name: 'set tempo',
    pressReleaseAction: () => {
      dispatch(saveMenuAsPrevious());
      renderTempoMenu();
    },
    pressAndHoldAction: dispatchThunk(setInterceptorWithVelocity('control', {
      upAction: dispatchThunk(tempoUp()),
      downAction: dispatchThunk(tempoDown()),
    })),
    pressAndHoldReleaseAction: dispatchThunk(clearInterceptor('control')),
  }]));
  dispatch(setMenuTitle('home'));
};

module.exports = (populateHomeView = populateDefaultHomeView) => {
  populateHomeView();
  observeStore(
    store,
    selectHomeViewComponents,
    handleChange,
  );
};
