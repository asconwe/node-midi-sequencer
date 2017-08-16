const { requestMidiAccess } = require('web-midi-api');

const { handleMidiSuccess, handleMidiFaluire } = require('./modules/handleMidiRequest');

requestMidiAccess().then(handleMidiSuccess, handleMidiFaluire)