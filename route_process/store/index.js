const { combineReducers, createStore } = require('redux');

const messages = require('./messages/reducer');
const length = require('./length/reducer');
const quantization = require('./quantization/reducer');
const pendingNotes = require('./pendingNotes/reducer');

const rootReducer = combineReducers({
  messages,
  length,
  quantization,
  pendingNotes,
});

const store = createStore(rootReducer);

module.exports = store;
