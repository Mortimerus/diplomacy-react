import { createElement } from 'react';
import { MAP_ARMY_R_REL, MAP_FLEET_REL } from '../../../constants/defaults/uiConfig';
import viewBoxToMapNormal from '../../converter/cords/viewBoxToMapNormal';
import './renderUnits.css';

const renderUnits = (dataZones, dataUnits, dataViewBox) => {
  let allUnits = [];
  if (dataZones && dataUnits && dataViewBox) {
    const mapNormal = viewBoxToMapNormal(dataViewBox).n;
    const r = mapNormal / MAP_ARMY_R_REL;
    const fleetSize = mapNormal / MAP_FLEET_REL;
    if (dataUnits.length) {
      for (let i = 0; i < dataUnits.length; i += 1) {
        const thisPlayersData = dataUnits[i];
        const thisPlayersRole = thisPlayersData[0];
        const thisPlayersUnits = thisPlayersData[1];
        if (thisPlayersUnits.length) {
          for (let j = 0; j < thisPlayersUnits.length; j += 1) {
            let elementProps = {};
            const thisUnitType = thisPlayersUnits[j][0];
            const thisUnitZone = thisPlayersUnits[j][1];
            if (dataZones.length) {
              for (let k = 0; k < dataZones.length; k += 1) {
                const thisZonesData = dataZones[k];
                const thisZonesId = thisZonesData[0];
                if (thisUnitZone.toString() === thisZonesId) {
                  const thisZoensProps = thisZonesData[1];
                  const thisZonesCoords = thisZoensProps.unit_pos[0];
                  const thisZonesX = thisZonesCoords[0];
                  const thisZonesY = thisZonesCoords[1];
                  // army
                  if (thisUnitType === 1) {
                    elementProps = {
                      cx: thisZonesX,
                      cy: thisZonesY,
                      r,
                      className: `unit player${thisPlayersRole}`,
                      key: `army${thisPlayersRole}|${thisZonesX}|${thisZonesY}`,
                      'data-unitzone': thisZonesId,
                      'data-unittype': thisUnitType,
                    };
                    // fleet
                  } else if (thisUnitType === 2) {
                    elementProps = {
                      d: `M${thisZonesX - 3 * fleetSize},${thisZonesY + 1.6 * fleetSize}L${thisZonesX + 3 * fleetSize},${thisZonesY + 1.6 * fleetSize}L${thisZonesX},${thisZonesY - 3 * fleetSize}Z`,
                      className: `unit player${thisPlayersRole}`,
                      key: `fleet${thisPlayersRole}|${thisZonesX}|${thisZonesY}`,
                      'data-unitzone': thisZonesId,
                      'data-unittype': thisUnitType,
                    };
                  }
                }
              }
            }
            const oneUnit = createElement(
              thisUnitType === 1 ? 'circle' : 'path',
              elementProps,
            );
            allUnits = allUnits.concat(oneUnit);
          }
        }
      }
    }
  }
  return allUnits;
};

export default renderUnits;
