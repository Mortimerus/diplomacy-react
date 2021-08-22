import whoOwnsWhichCenter from './whoOwnsWhichCenter';

const whoOwnsThisCenter = (rs, center) => {
  let output = -2;
  if (rs && center) {
    const { thisVariant, thisGameId } = rs;
    const dataPositions = rs[`dataGamePositions|${thisGameId}`] || [];
    const dataMap = rs[`dataMap|${thisVariant}`] || [];
    const { ownerships } = dataPositions;
    const { zones } = dataMap;
    const ownerArr = whoOwnsWhichCenter(ownerships, zones);
    if (ownerArr.length) {
      for (let i = 0; i < ownerArr.length; i += 1) {
        const ownerArrZoneId = ownerArr[i][0];
        const ownerArrRoleOwner = ownerArr[i][1];
        if (ownerArrZoneId.toString() === center.toString()) {
          output = ownerArrRoleOwner;
        }
      }
    }
  }
  return output;
};

export default whoOwnsThisCenter;
