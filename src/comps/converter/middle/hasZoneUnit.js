const hasMainZoneUnit = (rs, zone) => {
  let output = '';
  if (rs && zone) {
    // return mainzone in case of input zone is coastal zone
    const { thisVariant, thisGameId } = rs;
    const dataGamePosition = rs[`dataGamePositions|${thisGameId}`];
    const dataMap = rs[`dataMap|${thisVariant}`];
    if (dataMap && dataGamePosition) {
      const { zones } = dataMap;
      if (zones.length) {
        // has input zone coastal zone?
        for (let i = 0; i < zones.length; i += 1) {
          const zonesZoneId = zones[i][0].toString();
          if (zonesZoneId === zone.toString()) {
            const mainZoneHasCoastalZone = zones[i][4];
            let checkThisZonesArr = [];
            checkThisZonesArr = checkThisZonesArr.concat(zonesZoneId);
            if (mainZoneHasCoastalZone !== 0) {
              // is costal zones
              for (let j = 0; j < zones.length; j += 1) {
                const mainZoneIdOfCoastalZones = zones[j][6];
                if (zone.toString() === mainZoneIdOfCoastalZones.toString()) {
                  checkThisZonesArr = checkThisZonesArr.concat(zones[j][0]);
                }
              }
            }
            if (checkThisZonesArr.length) {
              for (let j = 0; j < checkThisZonesArr.length; j += 1) {
                const oneZoneToCheck = checkThisZonesArr[j];
                const { units } = dataGamePosition;
                if (units.length) {
                  for (let k = 0; k < units.length; k += 1) {
                    const unitsOneEntry = units[k];
                    const unitsOneEntryOwner = unitsOneEntry[0];
                    const unitsOneEntryUnitsArr = unitsOneEntry[1];
                    for (let l = 0; l < unitsOneEntryUnitsArr.length; l += 1) {
                      const unitIsInThisZone = unitsOneEntryUnitsArr[l][1];
                      if (oneZoneToCheck === unitIsInThisZone.toString()) {
                        const typeOfUnitInThisZone = unitsOneEntryUnitsArr[l][0];
                        output = {
                          zone: oneZoneToCheck,
                          type: typeOfUnitInThisZone,
                          owner: unitsOneEntryOwner,
                        };
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

export default hasMainZoneUnit;
