const constants = require('./constants');

const addPendingNote = (key, value) => ({
  type: constants.ADD_PENDING_NOTE,
  key,
  value,
});

const clearPendingNote = key => ({
  type: constants.CLEAR_PENDING_NOTE,
  key,
});

const clearAllPendingNotes = () => ({
  type: constants.CLEAR_ALL_PENDING_NOTES,
});

module.exports = {
  addPendingNote,
  clearPendingNote,
  clearAllPendingNotes,
};
