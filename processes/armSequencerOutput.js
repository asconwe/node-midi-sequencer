const store = require('../store');
const observeStore = require('../utils/observeStore');

const selectOutPorts = require('../store/');

const handleChange = () => {

};

module.exports = () => {
  observeStore(
    store,
    selectIsPlaying,
    handleChange,
  );
}
;