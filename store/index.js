const { combineReducers, createStore } = require('redux');

const ports = require('./ports/reducer');
const routes = require('./routes/reducer');
const MIDIAccess = require('./MIDI-access/reducer');
const listeners = require('./listeners/reducer');


const rootReducer = combineReducers({ routes, ports, MIDIAccess, listeners })

const store = createStore(rootReducer);

module.exports = store;