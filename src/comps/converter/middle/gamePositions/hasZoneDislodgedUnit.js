// returns [<dislodgedUnitOwner>, <dislodgedUnitZone>, <forbiddenZone>]
const hasZoneDislodgedUnit = (dislodgedOnes, zone) => {
  if (dislodgedOnes && zone) {
    if (dislodgedOnes.length) {
      for (let i = 0; i < dislodgedOnes.length; i += 1) {
        const oneDislodged = dislodgedOnes[i][1];
        const oneOwner = dislodgedOnes[i][0];
        if (oneDislodged.length) {
          for (let j = 0; j < oneDislodged.length; j += 1) {
            if (zone.toString() === oneDislodged[j][1].toString()) {
              return [oneOwner, oneDislodged[j][1], oneDislodged[j][2]];
            }
          }
        }
      }
    }
  }
  return [];
};

export default hasZoneDislodgedUnit;
