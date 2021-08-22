export const isZoneANeighbouringToZoneB = (zoneA, zoneB, unitType, neighbouring) => {
  if (zoneA && zoneB && unitType && neighbouring) {
    const fleetOrArmy = neighbouring[parseInt(unitType, 10) - 1];
    for (let i = 0; i < fleetOrArmy.length; i += 1) {
      const foaId = fleetOrArmy[i][0];
      const neighArr = fleetOrArmy[i][1];
      if (foaId.toString() === zoneA.toString()) {
        for (let j = 0; j < neighArr.length; j += 1) {
          const oneZone = neighArr[j];
          if (oneZone.toString() === zoneB.toString()) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

export const dymmk = '';
