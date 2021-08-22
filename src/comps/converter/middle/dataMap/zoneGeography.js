// 1 coast, 2 land, 3 sea
const zoneGeography = (dataMap, zone) => {
  let output = 0;
  if (dataMap && zone) {
    const thisZone = parseInt(zone, 10);
    const { sea, coasts, land } = dataMap;
    if (sea.includes(thisZone)) {
      output = 3;
    }
    if (coasts.includes(thisZone)) {
      output = 1;
    }
    if (land.includes(thisZone)) {
      output = 2;
    }
  }
  return output;
};

export default zoneGeography;
