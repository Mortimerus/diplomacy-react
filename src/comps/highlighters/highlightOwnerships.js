/**
ownerships: "ownerships" from dataGamePositions|<gameId>"
zones: "zones" from dataMap|<variant>:
*/

import whoOwnsWhichCenter from '../converter/middle/whoOwnsWhichCenter';

const highlightOwnerships = (ownerships, zones) => {
  const domAllAreas = document.querySelectorAll('.area');
  if (ownerships) {
    const centerOwnerArr = whoOwnsWhichCenter(ownerships, zones);
    if (centerOwnerArr.length && domAllAreas.length) {
      for (let i = 0; i < domAllAreas.length; i += 1) {
        const oneDomZoneId = domAllAreas[i].dataset.zone;
        const oneDomZoneElement = domAllAreas[i];
        for (let j = 0; j < centerOwnerArr.length; j += 1) {
          if (oneDomZoneId.toString() === centerOwnerArr[j][0].toString()) {
            oneDomZoneElement.classList.add(`player${centerOwnerArr[j][1]}`);
          }
        }
      }
    }
  }
};

export default highlightOwnerships;

/**
 *
 * const highlightOwnerships = (ownerships, zones) => {
  if (ownerships.length) {
    // const centerOwnerArr = whoOwnsWhichCenter(ownerships, zones);
    const domAllAreas = document.querySelectorAll('.area');
    for (let i = 0; i < ownerships.length; i += 1) {
      const oneZoneArrPosFormat = ownerships[i][0];
      const thisZonesOwner = ownerships[i][1];
      for (let j = 0; j < zones.length; j += 1) {
        const oneZoneArrPosFromZones = zones[j][2];
        if (oneZoneArrPosFromZones.toString() === oneZoneArrPosFormat.toString()) {
          const thisZoneIsOwned = zones[j][0];
          // get zone from dom
          for (let k = 0; k < domAllAreas.length; k += 1) {
            const oneDomZoneId = domAllAreas[k].dataset.zone;
            const oneDomZoneElement = domAllAreas[k];
            if (oneDomZoneId.toString() === thisZoneIsOwned.toString()) {
              oneDomZoneElement.classList.add(`player${thisZonesOwner}`);
            }
          }
        }
      }
    }
  }
};
 */
