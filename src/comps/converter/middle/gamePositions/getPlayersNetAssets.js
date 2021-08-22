// number of owned centers vs number of units
const getPlayersNetAssets = (dataGamePositions, playerRole) => {
  let outp = 0;
  if (dataGamePositions && playerRole) {
    const { ownerships, units } = dataGamePositions;
    if (ownerships && units) {
      if (ownerships.length && units.length) {
        for (let i = 0; i < ownerships.length; i += 1) {
          if (ownerships[i][1] === parseInt(playerRole, 10)) {
            outp += 1;
          }
        }
        for (let i = 0; i < units.length; i += 1) {
          if (units[i][0] === playerRole.toString()) {
            outp -= units[i][1].length;
          }
        }
      }
    }
  }
  return outp;
};

export default getPlayersNetAssets;
