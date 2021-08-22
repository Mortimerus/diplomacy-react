// convert game-position
const toDataGamePostion = (fromApi) => {
  let convertedDislodgedOnes = [];
  let convertedForbiddens = [];
  let convertedOwnerships = [];
  let convertedUnits = [];
  if (fromApi) {
    const { forbiddens, ownerships, units } = fromApi;
    const dislogedOnes = fromApi.dislodged_ones;
    if (forbiddens.length) {
      convertedForbiddens = Object.entries(forbiddens);
    }
    if (dislogedOnes) {
      convertedDislodgedOnes = Object.entries(dislogedOnes);
    }
    if (ownerships) {
      convertedOwnerships = Object.entries(ownerships);
    }
    if (units) {
      convertedUnits = Object.entries(units);
    }
  }

  const output = {
    forbiddens: convertedForbiddens,
    ownerships: convertedOwnerships,
    dislodgedOnes: convertedDislodgedOnes,
    units: convertedUnits,
  };

  return {
    ...output,
  };
};

export default toDataGamePostion;
