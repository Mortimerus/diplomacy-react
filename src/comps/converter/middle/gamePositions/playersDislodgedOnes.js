const playersDislodgedOnes = (dislodgedOnes, roledId) => {
  let output = [];
  if (dislodgedOnes && roledId) {
    if (dislodgedOnes.length) {
      for (let i = 0; i < dislodgedOnes.length; i += 1) {
        if (roledId.toString() === dislodgedOnes[i][0].toString()) {
          output = output.concat([
            dislodgedOnes[i][1],
          ]);
        }
      }
    }
  }
  return output;
};

export default playersDislodgedOnes;
