const constants = require('./constants');

const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_PENDING_NOTE:
      return {
        ...state,
        [action.key]: action.value,
      };
    case constants.CLEAR_PENDING_NOTE:
      return {
        ...state,
        [action.key]: null,
      };
    case constants.CLEAR_ALL_PENDING_NOTES:
      return initialState;
    default:
      return state;
  }
};

module.exports = reducer;
