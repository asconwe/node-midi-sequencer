const constants = require('./constants');
const timeline = require('./timeline/reducer');
const initialState = {
  tracks: [
    timeline.initialState,
  ]
}

const tracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_NEW_TRACK:
      return {
        tracks: tracks.append(timeline.initialState);
      };
    case constants.REMOVE_TRACK:
      return {
        tracks: [
          ...tracks.slice(0, action.trackIndex),
          ...tracks.slice(action.trackIndex + 1),
        ],
      };
    case constants.TIMELINE_ACTION:
      return {
        tracks: [
          ...tracks.slice(0, action.trackIndex),
          timeline.reducer(tracks[action.trackIndex], action.timelineAction),
          ...tracks.slice(action.trackIndex + 1),
        ],
      };
    default:
      return state;
  }
}