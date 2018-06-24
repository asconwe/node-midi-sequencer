const store = require('../store');
const observeStore = require('../store/observeStore');

const selectOutPorts = require('../store/')

const handleChange = () => {

}

module.exports = () => {
  observeStore(
    store,
    selectIsPlaying,
    handleChange,
  )
}