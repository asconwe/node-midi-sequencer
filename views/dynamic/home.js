const homeView = ({
  menu,
  menuTitle,
  transportState,
  recordingState,
}) => `
${menuTitle}
${menu}
------------------------------------------------------------
${transportState}
${recordingState}

`;

module.exports = homeView;
