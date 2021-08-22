export const namesRolesArr = (rolesArrF) => {
  const output = {};
  if (rolesArrF) {
    if (rolesArrF.length) {
      for (let i = 0; i < rolesArrF.length; i += 1) {
        output[
          parseInt(rolesArrF[i][1][0], 10)] = [
          rolesArrF[i][1][1],
          rolesArrF[i][1][2],
          rolesArrF[i][1][3],
        ];
      }
    }
  }
  return output;
};

export const namesZonesArr = (zonesArrF) => {
  const output = {};
  if (zonesArrF) {
    if (zonesArrF.length) {
      for (let i = 0; i < zonesArrF.length; i += 1) {
        const zoneIdF = parseInt(zonesArrF[i][0], 10);
        const zoneLabelF = zonesArrF[i][1].label;
        const zoneNameF = zonesArrF[i][1].name;
        if (zoneNameF === '') {
          output[zoneIdF] = '';
        } else {
          output[zoneIdF] = zoneLabelF;
        }
      }
    }
  }
  return output;
};

export const namesCoastArr = (nameArrF) => {
  const output = {};
  if (nameArrF) {
    if (nameArrF.length) {
      for (let i = 0; i < nameArrF.length; i += 1) {
        const coastidF = parseInt(nameArrF[i][0], 10);
        const coastnameF = nameArrF[i][1];
        output[coastidF] = coastnameF;
      }
    }
  }
  return output;
};
