const nLongString = (n, str, start) => (start ? str.padStart(n) : str.padEnd(n));

module.exports = nLongString;
