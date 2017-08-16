function testInputs() {
    console.log('Testing MIDI-In ports...');
    inputs.forEach(function (port) {
        console.log('id:', port.id, 'manufacturer:', port.manufacturer, 'name:', port.name, 'version:', port.version);
        port.onmidimessage = onMidiIn;
    });
}