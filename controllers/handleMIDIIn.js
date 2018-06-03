module.exports = (event) => {
    var arr = [];
    for(var i = 0; i < event.data.length; i++){
      arr.push((event.data[i] < 16 ? '0' : '') + event.data[i].toString(16));
    }
    console.log('MIDI:', arr.join(' '));
}