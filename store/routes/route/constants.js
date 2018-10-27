const sequencerModes = {
  FREE: 'FREE',
  INCREMENTAL: 'INCREMENTAL',
};

const recordingModes = {
  [sequencerModes.FREE]: {
    OVERWRITE: 'OVERWRITE',
    ADD: 'ADD',
  },
  [sequencerModes.INCREMENTAL]: {
    OVERWRITE: 'OVERWRITE',
    ADD: 'ADD',
    APPEND: 'APPEND',
  },
};


module.exports = {
  UPDATE: 'ROUTES/ROUTE/UPDATE',
  QUANTIZE_RECORDING: 'ROUTES/ROUTE/QUANTIZE_RECORDING',
  QUANTIZE_PLAYBACK: 'ROUTES/ROUTE/QUANTIZE_PLAYBACK',
  INCREMENT_N: 'ROUTES/ROUTE/INCREMENT_N',
  INCREMENT_MULTIPLIER: 'ROUTES/ROUTE/INCREMENT_MULTIPLIER',
  DECREMENT_N: 'ROUTES/ROUTE/DECREMENT_N',
  DECREMENT_MULTIPLIER: 'ROUTES/ROUTE/DECREMENT_MULTIPLIER',
  ADD_MESSAGE: 'ROUTES/ROUTE/ADD_MESSAGE',
  ARM: 'ROUTES/ROUTE/ARM',
  DISARM: 'ROUTES/ROUTE/DISARM',
  sequencerModes,
  recordingModes,
};
