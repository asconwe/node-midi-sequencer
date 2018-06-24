const { combineReducers, createStore } = require('redux');

const ports = require('./ports/reducer');
const routes = require('./routes/reducer');
const MIDIAccess = require('./MIDI-access/reducer');
const listeners = require('./listeners/reducer');
const transport = require('./transport/reducer');
const userControl = require('./userControl/reducer');
const view = require('./view/reducer');

const rootReducer = combineReducers({
  routes, ports, MIDIAccess, listeners, transport, userControl, view,
});

const store = createStore(rootReducer);

module.exports = store;
