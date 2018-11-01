
const reloadReducer = (rootReducer, initialState) => (state = {}, action) => {
  if (action.type === 'RELOAD') {
    return {
      ...action.oldState,
      userControl: state.userControl,
      ports: state.ports,
      listeners: state.listeners,
    };
  }
  return rootReducer(state, action);
};

const reloadAction = oldState => ({
  type: 'RELOAD',
  oldState,
});

module.exports = {
  reloadAction,
  reloadReducer,
};
