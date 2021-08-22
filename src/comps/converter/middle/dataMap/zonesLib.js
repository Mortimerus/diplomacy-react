// zones from dataMap|[variant]
export const getZonePropByIdPlain = (zones, id) => {
  if (zones) {
    if (zones.length) {
      for (let i = 0; i < zones.length; i += 1) {
        if (zones[i][0].toString() === id.toString()) {
          return zones[i];
        }
      }
    }
  }
  return null;
};

export const isZoneStartCenter = (zones, id) => {
  if (getZonePropByIdPlain(zones, id) !== null) {
    return getZonePropByIdPlain(zones, id)[3];
  }
  return null;
};

// fleets only
export const returnCoastalTargetForFleet = (dataMap, activeZone, targetZone) => {
  let output = [];
  if (dataMap && activeZone && targetZone) {
    const { zones, neighbouring } = dataMap;
    for (let i = 0; i < zones.length; i += 1) {
      const zonesIsCoastalZone = zones[i][4];
      const thisZonesMainId = zones[i][0];
      // no coastal zone, return main id
      if (targetZone.toString() === thisZonesMainId.toString()) {
        if (zonesIsCoastalZone === 0) {
          output = [thisZonesMainId];
        } else {
          // is coastal zone
          for (let j = 0; j < zones.length; j += 1) {
            const mainIdOfCoastalZone = zones[j][6];
            const idOfCoastalZone = zones[j][0];
            if (mainIdOfCoastalZone.toString() === targetZone.toString()) {
              // is active unit/fleet neighbouring to this zone
              const [, waterNeighbours] = neighbouring;
              if (waterNeighbours.length) {
                for (let k = 0; k < waterNeighbours.length; k += 1) {
                  const waterNeighbourId = waterNeighbours[k][0];
                  const waterNeighbourZonesArr = waterNeighbours[k][1];
                  if (waterNeighbourId.toString() === idOfCoastalZone.toString()) {
                    if (waterNeighbourZonesArr.length) {
                      for (let l = 0; l < waterNeighbourZonesArr.length; l += 1) {
                        const oneWaterNeighbour = waterNeighbourZonesArr[l];
                        if (oneWaterNeighbour.toString() === activeZone) {
                          output = output.concat([idOfCoastalZone]);
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
  }
  return output;
};

export const getCoastalZoneLabel = (zones, zoneId, coastNames) => {
  if (zones && zoneId && coastNames) {
    for (let i = 0; i < zones.length; i += 1) {
      if (zoneId.toString() === zones[i][0]) {
        const thisCoastType = zones[i][5];
        for (let j = 0; j < coastNames.length; j += 1) {
          if (thisCoastType.toString() === coastNames[j][0]) {
            return coastNames[j][1];
          }
        }
      }
    }
  }
  return '';
};

export const returnCoastalZonesOfZone = (zones, mainZoneId) => {
  let output = [];
  if (zones && mainZoneId) {
    for (let i = 0; i < zones.length; i += 1) {
      if (zones[i][0] === mainZoneId.toString() && zones[i][4] === 1) {
        const oneCoastalZone = zones[i][0];
        for (let j = 0; j < zones.length; j += 1) {
          if (zones[j][6].toString() === oneCoastalZone) {
            output = output.concat([zones[j][0]]);
          }
        }
      }
    }
  }
  return output;
};

export const returnMainZoneOfZone = (zones, zoneId) => {
  let output = zoneId;
  if (zones && zoneId) {
    if (zones.length) {
      for (let i = 0; i < zones.length; i += 1) {
        const thatZoneId = zones[i][0];
        const thatCoastal = zones[i][6];
        if (thatZoneId.toString() === zoneId.toString()) {
          if (thatCoastal !== 0) {
            output = thatCoastal;
          }
        }
      }
    }
  }
  return output;
};
