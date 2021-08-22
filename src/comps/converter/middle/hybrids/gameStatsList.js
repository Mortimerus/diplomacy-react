import getRolePropsById from '../getRolePropsById';

const gameStatsList = (rs) => {
  let output = [];
  if (rs) {
    const { thisVariant, thisGameId, thisPlayersRole } = rs;
    const dataMap = rs[`dataMap|${thisVariant}`];
    const dataRoles = rs[`dataRoles|${thisVariant}`];
    const dataGamePositions = rs[`dataGamePositions|${thisGameId}`];
    const { players } = dataMap || [];
    const { ownerships, units } = dataGamePositions || [];

    if (players && ownerships && units && dataRoles) {
      if (players.length) {
        for (let i = 0; i < players.length; i += 1) {
          const playersRoleId = players[i][0]; // +
          if (playersRoleId) {
            const thisRolesZoneProps = getRolePropsById(playersRoleId, dataRoles);
            let thisPlayersArmies = 0;
            let thisPlayersFleets = 0;
            let thisPlayersUnits = 0;
            let thisPlayersCenters = 0;
            let thisOrdersNeeded = 0;
            let thisOrdersSubmitted = 0;
            let thisActionRequired = 0;
            // count players units
            if (units.length) {
              for (let j = 0; j < units.length; j += 1) {
                const unitsRoleId = units[j][0];
                if (playersRoleId === unitsRoleId) {
                  const unitsUnitsArr = units[j][1];
                  if (unitsUnitsArr.length) {
                    for (let k = 0; k < unitsUnitsArr.length; k += 1) {
                      thisPlayersUnits += 1;
                      if (unitsUnitsArr[k][0] === 1) {
                        thisPlayersArmies += 1;
                      }
                      if (unitsUnitsArr[k][0] === 2) {
                        thisPlayersFleets += 1;
                      }
                    }
                  }
                }
              }
            }
            // count players centers
            if (ownerships.length) {
              for (let j = 0; j < ownerships.length; j += 1) {
                const oneUnitsOwner = ownerships[j][1].toString();
                if (playersRoleId === oneUnitsOwner) {
                  thisPlayersCenters += 1;
                }
              }
            }
            if (thisPlayersRole > -1) {
              const dataGameOrdersSubmitted = rs[`dataGameOrdersSubmitted|${thisGameId}`];
              if (dataGameOrdersSubmitted) {
                const { submitted, needed } = dataGameOrdersSubmitted;
                const roleAsInt = parseInt(playersRoleId, 10);
                if (needed.length) {
                  if (needed.includes(roleAsInt) && !submitted.includes(roleAsInt)) {
                    thisOrdersNeeded = 2;
                    thisOrdersSubmitted = 1;
                    thisActionRequired = 2;
                  } else if (needed.includes(roleAsInt) && submitted.includes(roleAsInt)) {
                    thisOrdersNeeded = 2;
                    thisOrdersSubmitted = 2;
                    thisActionRequired = 1;
                  }
                } else {
                  thisOrdersNeeded = 1;
                  thisOrdersSubmitted = 1;
                  thisActionRequired = 1;
                }
              }
            }

            output = output.concat([[
              playersRoleId,
              thisRolesZoneProps[1],
              thisRolesZoneProps[3],
              thisPlayersArmies,
              thisPlayersFleets,
              thisPlayersUnits,
              thisPlayersCenters,
              thisPlayersCenters - thisPlayersUnits,
              thisOrdersNeeded,
              thisOrdersSubmitted,
              thisActionRequired,
            ]]);
          }
        }
      }
    }
  }
  return output;
};

export default gameStatsList;
