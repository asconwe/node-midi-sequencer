const constants = require('./constants');

const addMessage = (message, step) => ({
  type: constants.ADD_MESSAGE,
  message,
  step,
});

const clearTimeline = () => ({
  type: constants.CLEAR_TIMELINE,
});

const replaceTimeline = messages => ({
  type: constants.REPLACE_TIMELINE,
  messages,
});

module.exports = {
  addMessage,
  clearTimeline,
  replaceTimeline,
};
