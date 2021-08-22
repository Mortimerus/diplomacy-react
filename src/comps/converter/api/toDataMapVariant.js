// create arrays for map and player data
// geography:
/**
[[
<zoneId>,<zoneType>,<isCenter?>,<isStartCenter>,
<hasCoastalZone>,<coastalZoneType (ec/nc/sc)>,
<if coastal zone, belongs to which zone>
], [...]]
isCenter 0 || relative array position
*/
// players = [['<roleId>', ]]
const toDataMapVariant = (fromApi) => {
  let zones = [];
  let players = [];
  let yearZero = 0;
  let neighbouringZones = [];
  let coasts = [];
  let land = [];
  let sea = [];
  let centersArr = [];
  if (fromApi) {
    const {
      regions, centers, roles, neighbouring,
    } = fromApi;
    const coastalZone = fromApi.coastal_zones;
    const startCenters = fromApi.start_centers;
    yearZero = fromApi.year_zero;
    const { number } = roles;
    centersArr = centers;

    const hasZoneCoastalZone = (zone) => {
      let outp = 0;
      for (let i = 0; i < coastalZone.length; i += 1) {
        if (coastalZone[i][0] === zone) {
          // const coastalZoneType = coastalZone[i][1];
          // outp = coastalZoneType; 9, "2": 1, "33": 9, "11": 1, "45": 7}]]}
          outp = 1;
          return outp;
        }
      }
      return outp;
    };

    const isStartCenter = (zone) => {
      let outp = 0;
      for (let i = 0; i < startCenters.length; i += 1) {
        const onePlayersCenters = startCenters[i];
        if (onePlayersCenters.length) {
          if (onePlayersCenters.includes(zone)) {
            outp = i + 1;
          }
          /*
          for (let j = 0; j < onePlayersCenters.length; j += 1) {
            if (zone.toString() === onePlayersCenters[j].toString()) {
              outp = i + 1;
              return outp;
            }
          }
          */
        }
      }
      return outp;
    };

    for (let i = 0; i < regions.length; i += 1) {
      zones = zones.concat([[
        `${i + 1}`, // id
        regions[i], // zone type
        centers.includes(i + 1) ? centers.indexOf(i + 1) + 1 : 0,
        isStartCenter(parseInt(centers.indexOf(i + 1) + 1, 10)),
        hasZoneCoastalZone(i + 1),
        0,
        0,
      ]]);
      if (regions[i] === 1) {
        coasts = coasts.concat(i + 1);
      }
      if (regions[i] === 2) {
        land = land.concat(i + 1);
      }
      if (regions[i] === 3) {
        sea = sea.concat(i + 1);
      }
    }

    for (let i = 0; i < coastalZone.length; i += 1) {
      zones = zones.concat([[
        `${i + regions.length + 1}`, 1, 0, 0, 0, coastalZone[i][1], coastalZone[i][0],
      ]]);
    }

    for (let i = 0; i < number; i += 1) {
      players = players.concat([[`${i + 1}`, 1]]);
    }

    for (let i = 0; i < neighbouring.length; i += 1) {
      neighbouringZones = neighbouringZones.concat([Object.entries(neighbouring[i])]);
    }
  }
  return {
    zones,
    players,
    yearZero,
    ...{ neighbouring: neighbouringZones },
    coasts,
    land,
    sea,
    ...{ centers: centersArr },
  };
};

export default toDataMapVariant;
