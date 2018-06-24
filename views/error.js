const colors = require('colors');

const fullError = error => `
!!!!!!!!!!!!!!!!!!!!!!!!!!
${colors.blue('-----')}${colors.red(' ERROR --------------')}
!!!!!!!!!!!!!!!!!!!!!!!!!!
${error.stack}
--------------------------
MESSAGE: ${colors.red(error.message)}
--------------------------
`;

const strError = error => `

!!!!!!!!!!!!!!!!!!!!!!!!!!
${colors.blue('-----')}${colors.red(' ERROR --------------')}
!!!!!!!!!!!!!!!!!!!!!!!!!!
${new Error().stack}
--------------------------
MESSAGE: ${colors.red(error)}
--------------------------`;

const nullError = `
!!!!!!!!!!!!!!!!!!!!!!!!!!
${colors.blue('-----')}${colors.red(' ERROR --------------')}
!!!!!!!!!!!!!!!!!!!!!!!!!!
${new Error().stack}
--------------------------
${colors.red(`*NO ERROR OBJECT PROVIDED.
SEE THE ABOVE STACK TRACE.`)}
--------------------------`;

module.exports = (error) => {
  if (!error) return nullError;
  if (typeof error === 'string') return strError(error);
  return fullError(error);
};
