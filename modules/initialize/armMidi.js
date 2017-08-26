module.exports = (MIDI) => {
    console.log(MIDI);
    MIDI.inputs.map(portAndID => {
        const port = portAndID[1];
        console.log('id:', port.id, 'manufacturer:', port.manufacturer, 'name:', port.name, 'version:', port.version);
        port.onmidimessage = (message) => console.log(message);
    })
    return
}