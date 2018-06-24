module.exports = {
  inputsAvailable(state) {
    return state.ports.inputs.length > 0;
  },
  outputsAvailable(state) {
    return state.ports.outputs.length > 0;
  },
  allInputs(state) {
    return state.ports.inputs;
  },
  selectPorts(state) {
    return state.ports
  }
}