const sequencerModes = {
  FREE: 'FREE',
  INCREMENTAL: 'INCREMENTAL',
}

const recordingModes = {
  [sequencerModes.FREE]: {
    OVERWRITE: 'OVERWRITE',
    ADD: 'ADD',
  },
  [sequencerModes.INCREMENTAL]: {
    OVERWRITE: 'OVERWRITE',
    ADD: 'ADD',
    APPEND: 'APPEND'
  }
}

module.exports = {
  sequencerModes,
  recordingModes,
}