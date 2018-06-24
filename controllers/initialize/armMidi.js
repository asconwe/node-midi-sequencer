const MIDIMessage = require('midimessage');

module.exports = (MIDI) => {

    const handleMIDIIn = (routes) => {
        return (event) => {
            const parsedMIDIEvent = MIDIMessage(event);
            try {
                routes.forEach(route => {
                    if (route.in.channel === parsedMIDIEvent.channel) {
                        sendMIDIToSequencer(route, parsedMIDIEvent);
                    }
                });
            } catch (error) {
                console.error(error);
            }
        }
    }

    return MIDI.inputs.map(portAndID => {
        const port = portAndID[1];
        const routes = MIDI.routes.filter(route => {
            logger.info(route.in.name, port.name)
            return route.in.name === port.name;
        })
        logger.info(routes);
        port.onmidimessage = handleMIDIIn(routes);
    })
}