const homeView = ({
  menu,
  menuTitle,
  transportState,
  tempo,
  time,
  tracks,
}) => `
${menuTitle}
${menu}
------------------------------------------------------------
|| ${transportState} || ${tempo} || ${time}
------------------------------------------------------------
TRACKS:
${tracks}
`;

module.exports = homeView;
