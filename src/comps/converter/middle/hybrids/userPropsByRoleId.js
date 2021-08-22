const userPropsByroleId = (rs, roleId) => {
  let output = {};
  if (rs && roleId) {
    const { dataPlayers, thisGameId } = rs;
    if (thisGameId && dataPlayers) {
      const dataGameAllocations = rs[`dataGameAllocations|${thisGameId}`] || [];
      if (dataGameAllocations.length) {
        for (let i = 0; i < dataGameAllocations.length; i += 1) {
          if (dataGameAllocations[i][1] === parseInt(roleId, 10)) {
            const playersId = dataGameAllocations[i][0];
            if (dataPlayers.length) {
              for (let j = 0; j < dataPlayers.length; j += 1) {
                if (dataPlayers[j][0] === playersId) {
                  const dataPlayersProps = dataPlayers[j][1];
                  output = dataPlayersProps;
                }
              }
            }
          }
        }
      }
    }
  }
  return output;
};

export default userPropsByroleId;
