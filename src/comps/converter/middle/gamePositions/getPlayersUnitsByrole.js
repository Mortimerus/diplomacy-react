// units from gamePositions
const getPlayersUnitsByRole = (units, role) => {
  if (units && role) {
    for (let i = 0; i < units.length; i += 1) {
      if (units[i][0].toString() === role.toString()) {
        return units[i][1];
      }
    }
  }
  return [];
};

export default getPlayersUnitsByRole;
