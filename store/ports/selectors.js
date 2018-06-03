module.exports = {
  inputsAvailable(state) {
    console.log(state.ports)
    return state.ports.inputs.length > 0;
  },
  outputsAvailable(state) {
    return state.ports.outputs.length > 0;
  }
}