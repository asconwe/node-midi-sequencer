const homeView = ({
  menu,
  menuTitle,
  transportState,
  recordingState,
  tempo,
  time,
  tracks,
}) => `
${menuTitle}
${menu}
------------------------------------------------------------
|| ${transportState} || ${tempo} || ${time}
|| ${recordingState}
------------------------------------------------------------
TRACKS:
${tracks}
`;

module.exports = homeView;
