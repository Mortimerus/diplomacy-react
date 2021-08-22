// units: <dataGamePositions|gameId.units>
// roledId: <PlayersRole>
const getRolesUnitsById = (units, zones, roleId) => {
  let output = [];
  if (units && roleId && zones) {
    if (units.length && parseInt(roleId, 10) > 0) {
      for (let i = 0; i < units.length; i += 1) {
        const roleIdFromUnitsArr = units[i][0];
        const thisRolesUnits = units[i][1];
        if (roleId.toString() === roleIdFromUnitsArr.toString()) {
          if (thisRolesUnits) {
            if (thisRolesUnits.length) {
              for (let j = 0; j < thisRolesUnits.length; j += 1) {
                const thisRolesOneUnitEntry = thisRolesUnits[j];
                const thisRolesOneUnitZone = thisRolesOneUnitEntry[1];
                if (zones.length) {
                  for (let k = 0; k < zones.length; k += 1) {
                    const oneZoneEntry = zones[k];
                    const zoneEntryZoneId = oneZoneEntry[0];
                    const zoneEntryMainZone = oneZoneEntry[6];
                    const zoneEntryCoastalZoneType = oneZoneEntry[5];
                    if (zoneEntryZoneId.toString() === thisRolesOneUnitZone.toString()) {
                      // coastal zone
                      if (zoneEntryMainZone !== 0) {
                        output = output.concat([
                          [...thisRolesOneUnitEntry, zoneEntryMainZone, zoneEntryCoastalZoneType],
                        ]);
                      } else {
                        // regular zone
                        output = output.concat([
                          [...thisRolesOneUnitEntry, thisRolesOneUnitEntry[1], 0],
                        ]);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return output;
};

export default getRolesUnitsById;

/*
output: [[<unitType>, <zoneIdReal>, <zoneIdMain>, <coastalType>], [...]]
zoneIdMain is main zone of coastalZone
*/
