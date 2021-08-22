function zonePropsById(zones, id) {
  let output = {};
  if (zones && id) {
    if (zones.length) {
      for (let i = 0; i < zones.length; i += 1) {
        if (id.toString() === zones[i][0].toString()) {
          const oneZoneProp = zones[i][1];
          output = oneZoneProp;
          return output;
        }
      }
    }
  }
  return output;
}

export default zonePropsById;
