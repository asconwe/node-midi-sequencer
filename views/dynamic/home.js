const homeView = ({
  menu,
  menuTitle,
  transportState,
  recordingState,
  tempo,
}) => `
${menuTitle}
${menu}
------------------------------------------------------------
|| ${transportState} || ${tempo}
|| ${recordingState}

`;

module.exports = homeView;
