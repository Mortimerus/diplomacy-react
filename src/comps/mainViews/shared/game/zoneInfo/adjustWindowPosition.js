const adjustWindowPosition = (
  thisClickX, thisClickY, offsetWidth, offsetHeight, windowWidth, windowHeight,
) => {
  let corrX = 0;
  let corrY = 0;
  if (thisClickX && thisClickY && offsetHeight !== 0
    && offsetWidth !== 0 && windowWidth && windowHeight) {
    const xEnd = parseInt(thisClickX + windowWidth, 10);
    const yEnd = parseInt(thisClickY + windowHeight, 10);
    if (xEnd > offsetWidth) {
      corrX = offsetWidth - windowWidth;
    } else {
      corrX = thisClickX;
    }
    if (yEnd > offsetHeight) {
      corrY = offsetHeight - windowHeight;
    } else {
      corrY = thisClickY;
    }
  }
  return {
    corrX,
    corrY,
  };
};

export default adjustWindowPosition;
