import {
  MAP_BUILD_ARMY_REL, MAP_BUILD_FLEET_REL,
  MAP_HEIGHT_MARKER_REL, MAP_HOLD_REL, MAP_LINE_STROKE_WIDTH_REL,
  MAP_SACK_UNIT_REL, MAP_WIDTH_MARKER_REL,
} from '../../../constants/defaults/uiConfig';
import viewBoxToMapNormal from '../../converter/cords/viewBoxToMapNormal';
/*
export const svgLineProps = (active, target, viewBox) => ([
  'path',
  {
    key: `keyRendTransAttActZ.${active.x}.${target.y}${active.y}.${target.x}`,
    d: `M${active.x},${active.y}L${target.x},${target.y}Z`,
    stroke: 'black',
    strokeWidth: Math.floor(viewBoxToMapNormal(viewBox).n / 9),
    markerEnd: 'url(#arrowhead)',
  },
]);
*/
// line
export const svgLineProps = (active, target, viewBox, markerEnd, className) => ([
  'line',
  {
    x1: active.x,
    y1: active.y,
    x2: target.x,
    y2: target.y,
    strokeWidth: viewBoxToMapNormal(viewBox).n / MAP_LINE_STROKE_WIDTH_REL,
    markerEnd: markerEnd || '',
    key: `keyline|${active.x + active.y}.${target.x + target.y}`,
    className: className || '',
  },
]);
// arrow head
export const svgPolygonProps = (active, target, className) => ([
  'polygon',
  {
    points: '0 0, 10 2.5, 0 5',
    key: `keyPolygonTransAtt|${active.x + active.y}.${target.x + target.y}`,
    className: className || '',
  },
]);

export const svgMarkerProps = (active, target, viewBox, id, className) => ([
  'marker',
  {
    id,
    markerHeight: viewBoxToMapNormal(viewBox).n / MAP_HEIGHT_MARKER_REL,
    markerWidth: viewBoxToMapNormal(viewBox).n / MAP_WIDTH_MARKER_REL, // 10, // 10,
    refX: 10,
    refY: 2.5,
    orient: 'auto',
    key: `keyRendTranAttMarkerArrow|${active.x + active.y}.${target.x + target.y}`,
    className: className || '',
  }]);

export const svgHoldProps = (holdPos, viewBox, className, otherProps) => ([
  'circle',
  {
    cx: holdPos.x,
    cy: holdPos.y,
    r: viewBoxToMapNormal(viewBox).n / MAP_HOLD_REL,
    className,
    fill: 'none',
    strokeWidth: viewBoxToMapNormal(viewBox).n / MAP_HOLD_REL / 5,
    key: `keyTrnsHold${holdPos.x}.${holdPos.y}`,
    ...otherProps,
  },
]);

export const svgHoldMarkerProps = (id, className) => ([
  'marker',
  {
    id,
    markerHeight: 10,
    markerWidth: 10,
    refX: 10,
    refY: 5,
    orient: 'auto',
    className,
    key: `keyTrnsHalfcircle.${id}|end`,
  },
]);

export const svgHalfCircleProps = () => ([
  'path',
  {
    d: 'M 10,0 a 3 3 0 0 0 0,10',
    stroke: 'orange',
    fill: 'none',
    strokeWidth: 1,
  },
]);
// NOT IN USE
export const svgCircleProps = (active, viewBox, className) => ([
  'circle',
  {
    cx: active.x,
    cy: active.y,
    className,
    r: viewBoxToMapNormal(viewBox).n / MAP_BUILD_ARMY_REL,
    key: `keyTrnsCirc${active.x}.${active.y}|end`,
  },
]);

export const svgBuildArmyProps = (active, viewBox, className, otherProps) => ([
  'circle',
  {
    cx: active.x,
    cy: active.y,
    className,
    r: viewBoxToMapNormal(viewBox).n / MAP_BUILD_ARMY_REL,
    key: `keyTrnsBuildArmy${active.x}.${active.y}|end`,
    ...otherProps,
  },
]);

export const svgBuildFleetProps = (active, viewBox, className, otherProps) => ([
  'path',
  {
    d: `M${active.x - 3 * MAP_BUILD_FLEET_REL * viewBoxToMapNormal(viewBox).n},${active.y + 1.6 * MAP_BUILD_FLEET_REL * viewBoxToMapNormal(viewBox).n}L${active.x + 3 * MAP_BUILD_FLEET_REL * viewBoxToMapNormal(viewBox).n},${active.y + 1.6 * MAP_BUILD_FLEET_REL * viewBoxToMapNormal(viewBox).n}L${active.x},${active.y - 3 * MAP_BUILD_FLEET_REL * viewBoxToMapNormal(viewBox).n}Z`,
    className,
    key: `keyTrnsBuildFleet${active.x}|${active.y}|${className}`,
    ...otherProps,
  },
]);

export const svgSackProps = (crossPos, viewBox, className, otherProps) => ([
  'path',
  {
    d:
    `M${crossPos.x},${crossPos.y}L${crossPos.x - MAP_SACK_UNIT_REL * viewBoxToMapNormal(viewBox).n},${crossPos.y - MAP_SACK_UNIT_REL * viewBoxToMapNormal(viewBox).n}
    M${crossPos.x},${crossPos.y}L${crossPos.x - MAP_SACK_UNIT_REL * viewBoxToMapNormal(viewBox).n},${crossPos.y + MAP_SACK_UNIT_REL * viewBoxToMapNormal(viewBox).n}
    M${crossPos.x},${crossPos.y}L${crossPos.x + MAP_SACK_UNIT_REL * viewBoxToMapNormal(viewBox).n},${crossPos.y + MAP_SACK_UNIT_REL * viewBoxToMapNormal(viewBox).n}
    M${crossPos.x},${crossPos.y}L${crossPos.x + MAP_SACK_UNIT_REL * viewBoxToMapNormal(viewBox).n},${crossPos.y - MAP_SACK_UNIT_REL * viewBoxToMapNormal(viewBox).n}Z`,
    className,
    key: `keyTrnsSackKillUnit${crossPos.x}.${crossPos.y}|end`,
    strokeWidth: viewBoxToMapNormal(viewBox).n / MAP_LINE_STROKE_WIDTH_REL,
    ...otherProps,
  },
]);
