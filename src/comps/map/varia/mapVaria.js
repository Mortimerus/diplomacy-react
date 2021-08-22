export const correctXY = (coords, plusX, plusY) => {
  let output = {};
  if (coords) {
    output = {
      x: coords.x + plusX,
      y: coords.y + plusY,
    };
  }
  return output;
};

export const getMiddleOfLine = (lineStartCoords, lineEndCoords, correctionArr) => {
  let output = {};
  if (lineStartCoords && lineEndCoords) {
    const startX = parseInt(lineStartCoords.x, 10);
    const startY = parseInt(lineStartCoords.y, 10);
    const endX = parseInt(lineEndCoords.x, 10);
    const endY = parseInt(lineEndCoords.y, 10);
    const la = startX - endX;
    const lb = startY - endY;
    const pwrSum = (la * la) + (lb * lb);
    const lc = Math.sqrt(pwrSum);
    const a1 = (la * (lc / 2)) / lc;
    const b1 = (lb * (lc / 2)) / lc;
    output = {
      x: endX + a1 + correctionArr[0],
      y: endY + b1 + correctionArr[1],
    };
  }
  return output;
};
