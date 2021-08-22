/* eslint-disable no-unused-vars */
import { createElement } from 'react';
import { MAP_CONVOY_DEVIATION_REL, MAP_SUPPORT_HOLD_DEVIATION_REL, MAP_SUPPORT_MOVE_DEVIATION_REL } from '../../../constants/defaults/uiConfig';
import { unitCordsByZoneId } from '../../converter/middle/getZonePropsLib';
import {
  svgHoldProps, svgLineProps, svgMarkerProps, svgPolygonProps, svgHoldMarkerProps,
  svgHalfCircleProps,
  svgBuildArmyProps,
  svgBuildFleetProps,
  svgSackProps,
} from '../svgElementProps/svgTransitions';
import { correctXY, getMiddleOfLine } from '../varia/mapVaria';
import './renderTransitions.css';
// `dataZones|${thisVariant}`,  <dataGameTransitions|23|10>, <dataViewBox>
const renderTransitions = (zones, transitions, viewBox) => {
  let allOrders = [];
  if (zones && transitions && viewBox) {
    const { orders } = transitions;
    const fakeUnits = transitions.fake_units;
    if (orders) {
      if (orders.length) {
        for (let i = 0; i < orders.length; i += 1) {
          const oneOrder = orders[i];
          const [
            unitType, playerRole, orderType, activeUnitZone, passiveUnitZone, targetZone,
          ] = oneOrder;

          const activeZoneCords = unitCordsByZoneId(zones, activeUnitZone);
          const targetZoneCords = unitCordsByZoneId(zones, targetZone);

          // build
          if (orderType === 8) {
            if (fakeUnits.length) {
              for (let j = 0; j < fakeUnits.length; j += 1) {
                const thisFakeUnitZone = fakeUnits[j][2];
                if (thisFakeUnitZone === activeUnitZone) {
                  const thisFakeUnitType = fakeUnits[j][1];
                  const thisFakeUnitsRole = fakeUnits[j][3];

                  if (thisFakeUnitType === 1) {
                    // build army
                    const svgBuild = createElement(
                      ...svgBuildArmyProps(activeZoneCords, viewBox, `mapel-trns-build-army player${thisFakeUnitsRole}`, { 'data-orders': activeUnitZone }),
                    );
                    allOrders = allOrders.concat([svgBuild]);
                  }
                  if (thisFakeUnitType === 2) {
                    // build fleet
                    const svgBuild = createElement(
                      ...svgBuildFleetProps(activeZoneCords, viewBox, `mapel-trns-build-fleet player${thisFakeUnitsRole}`, { 'data-orders': activeUnitZone }),
                    );
                    allOrders = allOrders.concat([svgBuild]);
                  }
                }
              }
            }
          }

          // retreat
          if (orderType === 6) {
            const svgLine = createElement(
              ...svgLineProps(correctXY(activeZoneCords, 22, 22), correctXY(targetZoneCords, 22, 22), viewBox, 'url(#retreathead)', 'mapel-trns-line-retreat'),
            );
            const svgPolygon = createElement(
              ...svgPolygonProps(correctXY(activeZoneCords, 22, 22), correctXY(targetZoneCords, 22, 22), 'mapel-trns-polygon-retreat'),
            );
            const svgMarker = createElement(
              ...svgMarkerProps(correctXY(activeZoneCords, 22, 22), correctXY(targetZoneCords, 22, 22), viewBox, 'retreathead', 'mapel-trns-marker-retreat'),
              svgPolygon,
            );
            const svgDefs = createElement('defs',
              { key: `defs|TrnsRetreat|${activeZoneCords.x + activeZoneCords.y + targetZoneCords.x + targetZoneCords.y}`, pointerEvents: 'none' },
              svgMarker);
            const svgG = createElement('g',
              {
                key: `keyGTrns|retreat|${activeZoneCords.x + activeZoneCords.y}.${targetZoneCords.x + targetZoneCords.y}|end`, pointerEvents: 'none', className: 'mapel-trns-retreat', 'data-orders': activeUnitZone,
              },
              [svgDefs, svgLine]);

            allOrders = allOrders.concat([svgG]);
          }

          // sack / kill unit
          if (orderType === 9) {
            const svgSack = createElement(
              ...svgSackProps(activeZoneCords, viewBox, 'mapel-trns-sack', { 'data-orders': activeUnitZone }),
            );
            allOrders = allOrders.concat([svgSack]);
          }
          // dispand in retreat
          if (orderType === 7) {
            const svgSack = createElement(
              ...svgSackProps(correctXY(activeZoneCords, 22, 22), viewBox, 'mapel-trns-sack', { 'data-orders': activeUnitZone }),
            );
            allOrders = allOrders.concat([svgSack]);
          }

          // hold
          if (orderType === 4) {
            const svgHold = createElement(
              ...svgHoldProps(activeZoneCords, viewBox, 'mapel-trns-hold', { 'data-orders': activeUnitZone }),
            );
            allOrders = allOrders.concat([svgHold]);
          }

          // attack
          if (orderType === 1) {
            const svgLine = createElement(
              ...svgLineProps(activeZoneCords, targetZoneCords, viewBox, 'url(#arrowhead)', 'mapel-trns-line'),
            );
            const svgPolygon = createElement(
              ...svgPolygonProps(activeZoneCords, targetZoneCords, 'mapel-trns-polygon'),
            );
            const svgMarker = createElement(
              ...svgMarkerProps(activeZoneCords, targetZoneCords, viewBox, 'arrowhead', 'mapel-trns-marker'),
              svgPolygon,
            );
            const svgDefs = createElement('defs',
              { key: `defs|${activeZoneCords.x + activeZoneCords.y + targetZoneCords.x + targetZoneCords.y}`, pointerEvents: 'none' },
              svgMarker);
            const svgG = createElement('g',
              {
                key: `keyGTrans|ggg${activeZoneCords.x + activeZoneCords.y}.${targetZoneCords.x + targetZoneCords.y}|end`, pointerEvents: 'none', className: 'mapel-trns-move', 'data-orders': activeUnitZone,
              },
              [svgDefs, svgLine]);

            allOrders = allOrders.concat([svgG]);
          }

          // support hold
          if (orderType === 3) {
            const svgLine = createElement(
              ...svgLineProps(correctXY(activeZoneCords, ...MAP_SUPPORT_HOLD_DEVIATION_REL), targetZoneCords, viewBox, 'url(#halfcirc)', 'mapel-trns-line-hold'),
            );
            const svgHalfCircle = createElement(
              ...svgHalfCircleProps(),
            );
            const svgMarker = createElement(
              ...svgHoldMarkerProps('halfcirc', 'mapel-trns-marker-suphold'),
              svgHalfCircle,
            );
            const svgSupHoldDefs = createElement(
              'defs',
              { key: `keyTrnsSupHoldDefs.${activeZoneCords.x}.${activeZoneCords.y}.${targetZoneCords.x}.${targetZoneCords.y}` },
              svgMarker,
            );
            const svgSupHoldG = createElement(
              'g',
              { key: `keyTrnsSupHoldG.${activeZoneCords.x}.${activeZoneCords.y}.${targetZoneCords.x}.${targetZoneCords.y}`, className: 'mapel-trns-suphold', 'data-orders': activeUnitZone },
              [svgSupHoldDefs, svgLine],
            );
            allOrders = allOrders.concat(svgSupHoldG);
          }
          // orders with passive unit
          if (passiveUnitZone > 0) {
            const passiveZoneCords = unitCordsByZoneId(zones, passiveUnitZone);
            // support move
            if (orderType === 2) {
              const svgLine = createElement(
                ...svgLineProps(correctXY(passiveZoneCords, ...MAP_SUPPORT_MOVE_DEVIATION_REL), correctXY(targetZoneCords, ...MAP_SUPPORT_MOVE_DEVIATION_REL), viewBox, 'url(#suphead)', 'mapel-trns-line-suppmove'),
              );
              const svgPolygon = createElement(
                ...svgPolygonProps(correctXY(passiveZoneCords, ...MAP_SUPPORT_MOVE_DEVIATION_REL), correctXY(targetZoneCords, ...MAP_SUPPORT_MOVE_DEVIATION_REL), 'mapel-trns-polygon-suppmove'),
              );
              const svgMarker = createElement(
                ...svgMarkerProps(correctXY(passiveZoneCords, ...MAP_SUPPORT_MOVE_DEVIATION_REL), correctXY(targetZoneCords, ...MAP_SUPPORT_MOVE_DEVIATION_REL), viewBox, 'suphead', 'mapel-trns-marker-suppmove'),
                svgPolygon,
              );
              const svgLine2 = createElement(
                ...svgLineProps(
                  correctXY(activeZoneCords, ...MAP_SUPPORT_MOVE_DEVIATION_REL),
                  getMiddleOfLine(
                    correctXY(targetZoneCords, ...MAP_SUPPORT_MOVE_DEVIATION_REL),
                    passiveZoneCords,
                    MAP_SUPPORT_MOVE_DEVIATION_REL,
                  ),
                  viewBox, 'suphead', 'mapel-trns-line-suppmove',
                ),
              );
              const svgDefs = createElement('defs',
                { key: `keyTranssupmove|${activeZoneCords.y}.${activeZoneCords.x}.${passiveZoneCords.y}.${passiveZoneCords.x}.${targetZoneCords.x}.${targetZoneCords.y}`, pointerEvents: 'none' },
                svgMarker);
              const svgG = createElement('g',
                {
                  key: `keyGTranssupmove|${activeZoneCords.y}.${activeZoneCords.x}.${passiveZoneCords.x}.${passiveZoneCords.y}.${targetZoneCords.x}.${targetZoneCords.y}|ex`, pointerEvents: 'none', className: 'mapel-trns-supmove', 'data-orders': activeUnitZone,
                },
                [svgDefs, svgLine, svgLine2]);
              allOrders = allOrders.concat([svgG]);
            }
            // convoy
            if (orderType === 5) {
              const svgLine = createElement(
                ...svgLineProps(correctXY(passiveZoneCords, ...MAP_CONVOY_DEVIATION_REL), correctXY(targetZoneCords, ...MAP_CONVOY_DEVIATION_REL), viewBox, 'url(#convhead)', 'mapel-trns-line-conv'),
              );
              const svgPolygon = createElement(
                ...svgPolygonProps(correctXY(passiveZoneCords, ...MAP_CONVOY_DEVIATION_REL), correctXY(targetZoneCords, ...MAP_CONVOY_DEVIATION_REL), 'mapel-trns-polygon-conv'),
              );
              const svgMarker = createElement(
                ...svgMarkerProps(correctXY(passiveZoneCords, ...MAP_CONVOY_DEVIATION_REL), correctXY(targetZoneCords, ...MAP_CONVOY_DEVIATION_REL), viewBox, 'convhead', 'mapel-trns-marker-conv'),
                svgPolygon,
              );
              const svgLine2 = createElement(
                ...svgLineProps(
                  correctXY(activeZoneCords, ...MAP_CONVOY_DEVIATION_REL),
                  getMiddleOfLine(
                    correctXY(targetZoneCords, ...MAP_CONVOY_DEVIATION_REL),
                    passiveZoneCords,
                    MAP_CONVOY_DEVIATION_REL,
                  ),
                  viewBox, 'convhead', 'mapel-trns-line-conv',
                ),
              );
              const svgDefs = createElement('defs',
                { key: `keyDefsTransconv|${passiveZoneCords.x + passiveZoneCords.y}.${targetZoneCords.x + targetZoneCords.y}.${activeZoneCords.x}..${activeZoneCords.y}.|ggg`, pointerEvents: 'none', fillOpacity: 0.7 },
                svgMarker);
              const svgG = createElement('g',
                {
                  key: `keyGTransconv|${passiveZoneCords.x + passiveZoneCords.y}.${targetZoneCords.x + targetZoneCords.y}.${activeZoneCords.x}..${activeZoneCords.y}|nnnx`, pointerEvents: 'none', fillOpacity: 0.7, className: 'mapel-trns-conv', 'data-orders': activeUnitZone,
                },
                [svgDefs, svgLine, svgLine2]);
              allOrders = allOrders.concat([svgG]);
            }
          }
        }
      }
    }
  }
  return allOrders;
};

export default renderTransitions;
/*
0: (6) [23, 4, 1, 65, 0, 59]
1: (6) [23, 4, 5, 31, 65, 59]
2: (6) [23, 4, 5, 2, 65, 59]
3: (6) [23, 4, 2, 21, 65, 59]
*/
