const { requestMIDIAccess } = require('web-midi-api');

const { handleMIDISuccess, handleMIDIFaluire } = require('./modules/handleMIDIRequest');
const { getUserConfig, armMIDI, armSequencer } = require('./modules/initialize/initSequencer');

requestMIDIAccess()
    .then((MIDIAccess) => {
        const MIDI = handleMIDISuccess.getMIDIPorts(MIDIAccess)
        return getUserConfig(MIDI);
    })
    .then((MIDI) => { 
        return armMIDI(MIDI)
    })
    .catch(handleMIDIFaluire);
