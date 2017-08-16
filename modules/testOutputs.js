module.exports = function testOutputs() {
    console.log('Testing MIDI-Out ports...');
    outputs.forEach(function (port) {
        console.log('id:', port.id, 'manufacturer:', port.manufacturer, 'name:', port.name, 'version:', port.version);
        port.open();
        port.send([0x90, 60, 0x7f]);
    });
}