const constants = require('./constants');

const initialState = {
  view: '',
};

const viewReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.RENDER_VIEW:
      return {
        ...state,
        view: action.view,
      };
    default:
      return initialState;
  }
};

module.exports = viewReducer;
