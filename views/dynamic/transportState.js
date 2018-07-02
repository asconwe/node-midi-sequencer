const transportStateView = isPlaying => `
Transport: ${isPlaying ? 'playing' : 'paused'}
`;

module.exports = transportStateView;
