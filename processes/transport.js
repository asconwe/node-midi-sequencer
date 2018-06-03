const store = require('../store');
const observeStore = require('../store/observeStore');
const { selectIsPlaying } = require('../store/transport/selectors');

const promiseTimeout(delay, prevent) = new Promise((resolve, reject) => {
  if (selectIsPlaying(store.getState())) {
    return setTimeout(() => resolve(), delay);
  }
  return reject();
})

const setTimeout4Times = async (callback, delay) => {
  await promiseTimeout(delay);
  callback();
  await promiseTimeout(delay);
  callback();
  await promiseTimeout(delay);
  callback();
  await promiseTimeout(delay);
  callback();
}

const handleChange = () => {

}

module.exports = () => {
  const state = store.getState();
  let stepTimeout = null;
  observeStore(
    store,
    selectIsPlaying,
    handleChange,
  )
}