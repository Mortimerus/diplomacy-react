import hasZoneDislodgedUnit from '../gamePositions/hasZoneDislodgedUnit';
import { returnCoastalZonesOfZone } from '../dataMap/zonesLib';

const hasZoneDislodgedWithCoastals = (zones, dislodgedOnes, zoneId) => {
  let disl = {};
  if (zones && dislodgedOnes && zoneId) {
    const hasCoastals = returnCoastalZonesOfZone(zones, zoneId);

    if (hasCoastals.length) {
      for (let i = 0; i < hasCoastals.length; i += 1) {
        const dis = hasZoneDislodgedUnit(dislodgedOnes, hasCoastals[i]);
        if (dis.length) {
          const disOwner = dis[0];
          const disUnitZone = dis[1];
          const disForbidden = dis[2];
          disl = {
            disOwner,
            disUnitZone,
            disForbidden,
          };
          return disl;
        }
      }
    }
    const mainZone = hasZoneDislodgedUnit(dislodgedOnes, zoneId);
    if (mainZone.length) {
      disl = {
        disOwner: mainZone[0],
        disUnitZone: mainZone[1],
        disForbidden: mainZone[2],
      };
    }
  }
  return disl;
};

export default hasZoneDislodgedWithCoastals;
