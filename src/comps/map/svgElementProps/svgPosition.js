import { MAP_FORBIDDENS_CROSS_REL, MAP_LINE_STROKE_WIDTH_REL } from '../../../constants/defaults/uiConfig';
import viewBoxToMapNormal from '../../converter/cords/viewBoxToMapNormal';

export const svgCrossProps = (crossPos, viewBox, className) => ([
  'path',
  {
    d:
    `M${crossPos.x},${crossPos.y}L${crossPos.x - MAP_FORBIDDENS_CROSS_REL * viewBoxToMapNormal(viewBox).n},${crossPos.y - MAP_FORBIDDENS_CROSS_REL * viewBoxToMapNormal(viewBox).n}
    M${crossPos.x},${crossPos.y}L${crossPos.x - MAP_FORBIDDENS_CROSS_REL * viewBoxToMapNormal(viewBox).n},${crossPos.y + MAP_FORBIDDENS_CROSS_REL * viewBoxToMapNormal(viewBox).n}
    M${crossPos.x},${crossPos.y}L${crossPos.x + MAP_FORBIDDENS_CROSS_REL * viewBoxToMapNormal(viewBox).n},${crossPos.y + MAP_FORBIDDENS_CROSS_REL * viewBoxToMapNormal(viewBox).n}
    M${crossPos.x},${crossPos.y}L${crossPos.x + MAP_FORBIDDENS_CROSS_REL * viewBoxToMapNormal(viewBox).n},${crossPos.y - MAP_FORBIDDENS_CROSS_REL * viewBoxToMapNormal(viewBox).n}Z`,
    className,
    key: `keyForbiddens${crossPos.x}.${crossPos.y}`,
    strokeWidth: viewBoxToMapNormal(viewBox).n / MAP_LINE_STROKE_WIDTH_REL,
  },
]);

export const dummy = '';
