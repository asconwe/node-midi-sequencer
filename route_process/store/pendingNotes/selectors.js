const selectPendingNote = (state, key) => state.pendingNotes[key];

module.exports = {
  selectPendingNote,
};
