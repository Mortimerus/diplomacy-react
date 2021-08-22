/**
ownerships: "ownerships" from dataGamePositions|<gameId>"
zones: "zones" from dataMap|<variant>:

outp: [[<zoneId>, <roleOwner], [...]]
USED IN: highlightOwnerships()
 */

const whoOwnsWhichCenter = (ownerships, zones) => {
  let outp = [];
  if (ownerships && zones) {
    for (let i = 0; i < ownerships.length; i += 1) {
      const oneZoneArrPosFormat = ownerships[i][0];
      const thisZonesOwner = ownerships[i][1];
      for (let j = 0; j < zones.length; j += 1) {
        const oneZoneArrPosFromZones = zones[j][2];
        if (oneZoneArrPosFromZones.toString() === oneZoneArrPosFormat.toString()) {
          const thisZoneIsOwned = zones[j][0];
          outp = outp.concat([[thisZoneIsOwned, thisZonesOwner]]);
        }
      }
    }
  }

  return outp;
};

export default whoOwnsWhichCenter;
