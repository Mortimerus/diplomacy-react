import { createElement } from 'react';
import {
  MAP_ARMY_R_REL, MAP_DISLODGED_CROSS_REL,
  MAP_DISLODGED_UNIT_DOWN_REL,
  MAP_DISLODGED_UNIT_RIGHT_REL,
  MAP_FLEET_REL,
} from '../../../constants/defaults/uiConfig';
import viewBoxToMapNormal from '../../converter/cords/viewBoxToMapNormal';
import './renderDislodgedOnes.css';

const renderDislodgedOnes = (dataZones, dataUnits, dataViewBox) => {
  let allUnits = [];
  if (dataZones && dataUnits && dataViewBox) {
    const mapNormal = viewBoxToMapNormal(dataViewBox).n;
    const r = mapNormal / MAP_ARMY_R_REL;
    const fleetSize = mapNormal / MAP_FLEET_REL;
    const dislodgedCrossSize = mapNormal / MAP_DISLODGED_CROSS_REL;
    const dislodgedUnitRight = parseInt(mapNormal / MAP_DISLODGED_UNIT_RIGHT_REL, 10);
    const dislodgedUnitDown = parseInt(mapNormal / MAP_DISLODGED_UNIT_DOWN_REL, 10);
    if (dataUnits.length) {
      for (let i = 0; i < dataUnits.length; i += 1) {
        const thisPlayersData = dataUnits[i];
        const thisPlayersRole = thisPlayersData[0];
        const thisPlayersUnits = thisPlayersData[1];
        let tx = false;
        let ty = false;
        if (thisPlayersUnits.length) {
          for (let j = 0; j < thisPlayersUnits.length; j += 1) {
            let elementProps = {};
            let symbolProps = {};

            // dislodged unit
            const thisUnitType = thisPlayersUnits[j][0];
            const thisUnitZone = thisPlayersUnits[j][1];
            // [2] forbidden

            if (dataZones.length) {
              for (let k = 0; k < dataZones.length; k += 1) {
                const thisZonesData = dataZones[k];
                const thisZoensProps = thisZonesData[1];
                const thisZonesCoords = thisZoensProps.unit_pos[0];
                const thisZonesX = thisZonesCoords[0];
                const thisZonesY = thisZonesCoords[1];
                const thisZonesId = thisZonesData[0];

                if (thisUnitZone.toString() === thisZonesId) {
                  tx = thisZonesX + dislodgedUnitRight;
                  ty = thisZonesY + dislodgedUnitDown;
                }

                if (thisUnitType === 1
                && tx === parseInt(tx, 10)) {
                  elementProps = {
                    cx: tx,
                    cy: ty,
                    r,
                    className: `unit player${thisPlayersRole}`,
                    key: `armydislogx${thisPlayersRole}|${thisZonesX}|${thisZonesY}`,
                  };
                  // fleet
                } else if (thisUnitType === 2 && tx === parseInt(tx, 10)) {
                  elementProps = {
                    d: `M${tx - 3 * fleetSize},${ty + 1.6 * fleetSize}L${tx + 3 * fleetSize},${ty + 1.6 * fleetSize}L${tx},${ty - 3 * fleetSize}Z`,
                    className: `unit player${thisPlayersRole}`,
                    key: `fleetdislogx${thisPlayersRole}|${ty}|${tx}`,
                  };
                }
                // cross
                symbolProps = {
                  d:
                  `M${tx},${ty}L${tx - dislodgedCrossSize},${ty - dislodgedCrossSize}
                  M${tx},${ty}L${tx - dislodgedCrossSize},${ty + dislodgedCrossSize}
                  M${tx},${ty}L${tx + dislodgedCrossSize},${ty + dislodgedCrossSize}
                  M${tx},${ty}L${tx + dislodgedCrossSize},${ty - dislodgedCrossSize}
                  Z`,
                  key: `dislosymbkeyx${tx}.${ty}`,
                  className: 'dislcross',
                };
              }
            }

            const oneSymbol = createElement(
              'path',
              symbolProps,
            );
            const oneUnit = createElement(
              thisUnitType === 1 ? 'circle' : 'path',
              elementProps,
            );
            allUnits = allUnits.concat([oneUnit, oneSymbol]);
          }
        }
      }
    }
  }
  return allUnits;
};

export default renderDislodgedOnes;
