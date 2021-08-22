const addPlayerAllocationsToGameslist = (allocations, games) => {
  let outp = [];
  if (games && allocations) {
    if (games.length) {
      for (let i = 0; i < games.length; i += 1) {
        if (games[i][2] === undefined) {
          const oneGameEntry = games[i];
          const gameIdGamesList = oneGameEntry[0];
          let tempAllocations = -2;
          if (allocations.length) {
            for (let j = 0; j < allocations.length; j += 1) {
              const oneAllocationEntry = allocations[j];
              const gameIdAllocations = oneAllocationEntry[0];
              const oneAllocation = oneAllocationEntry[1];
              if (gameIdAllocations === gameIdGamesList) {
                tempAllocations = oneAllocation;
              }
            }
          }
          outp = outp.concat([[...oneGameEntry, tempAllocations]]);
        } else {
          outp = games;
        }
      }
    }
  }
  return outp;
};

export default addPlayerAllocationsToGameslist;
