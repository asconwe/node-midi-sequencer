const constants = require('./constants');

const initialState = {
  inputs: [],
  outputs: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.REPLACE_ALL:
      return {
        inputs: action.inputs,
        outputs: action.outputs,
      };
    default:
      return state
  }
}

module.exports = reducer;