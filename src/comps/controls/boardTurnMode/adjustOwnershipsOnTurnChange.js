/* eslint-disable no-unused-vars */
const adjustOwnershipsOnTurnChange = (rs, direction) => {
  if (rs && direction) {
    const {
      thisCurrentAdvancement, thisCurrentState, thisTurnMode,
      thisGameId,
    } = rs;
    if (thisCurrentState > 0) {
      // declare stuff
      // case: back from current position
      const dataGameTransitionsNowMinusOne = rs[`dataGameTransitions|${thisGameId}|${parseInt(thisCurrentAdvancement + thisTurnMode, 10)}`] || {};
      const dataGameTransitionsNowMinusTwo = rs[`dataGameTransitions|${thisGameId}|${parseInt(thisCurrentAdvancement - 1 + thisTurnMode, 10)}`] || {};
      const dataOwnershipsNowMinusOne = dataGameTransitionsNowMinusOne.ownerships || [];
      const dataOwnershipsNowMinusTwo = dataGameTransitionsNowMinusTwo.ownerships || [];
      if (direction === 'fwd' && thisTurnMode < 0) {
        const dataGamePositions = rs[`dataGamePositions|${thisGameId}`] || {};
        const ownershipsNow = dataGamePositions.ownerships || [];
      }

      if (direction === 'bck') {
        console.log('bkc', thisTurnMode);
      }
    }
  }
};

export default adjustOwnershipsOnTurnChange;
