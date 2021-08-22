import { MAP_ITEM_SIZE_MLTPLR } from '../../../constants/defaults/uiConfig';

const viewBoxToMapNormal = (viewBox) => {
  let output = {};
  if (viewBox) {
    const viewBoxData = viewBox.split(' ');
    const corrX = parseInt(viewBoxData[0], 10);
    const corrY = parseInt(viewBoxData[1], 10);
    // DEV, plus or minus corr??
    const mapWidth = parseInt(viewBoxData[2] - corrX, 10);
    const mapHeight = parseInt(viewBoxData[3] - corrY, 10);
    const mapAverage = (mapWidth + mapHeight) / MAP_ITEM_SIZE_MLTPLR;
    output = {
      n: mapAverage,
      w: mapWidth,
      h: mapHeight,
    };
  }
  return output;
};

export default viewBoxToMapNormal;
