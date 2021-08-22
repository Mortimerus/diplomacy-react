/**
dataZones: dataZones|<variant>
 */

import { createElement } from 'react';
import { MAP_CITY_CIRC_REL, MAP_CITY_RECT_REL } from '../../../constants/defaults/uiConfig';
// import { MAP_ITEM_SIZE_MLTPLR } from '../../../constants/defaults/uiConfig';
import viewBoxToMapNormal from '../../converter/cords/viewBoxToMapNormal';
import './renderCities.css';

const renderCities = (dataZones, dataViewBox) => {
  let allCities = [];
  if (dataZones && dataViewBox) {
    const mapAverage = viewBoxToMapNormal(dataViewBox).n;

    for (let i = 0; i < dataZones.length; i += 1) {
      const thisZonesProps = dataZones[i][1];
      const { center, type } = thisZonesProps;
      // center: 0 = no city; 1 = start center (square); 2 = independent center (circle)
      if (type > 0) {
        if (center > 0) {
          const { city } = thisZonesProps;
          if (city > 0) {
            let cityProps = {};
            const thisCitiesCords = thisZonesProps.coord_city;
            const svgElementType = city === 1 ? 'rect' : 'circle';
            // props for start centers (squares)
            if (city === 1) {
              cityProps = {
                // x coord correction; place city left from coord point
                x: thisCitiesCords[0] - mapAverage / 10,
                y: thisCitiesCords[1],
                width: mapAverage / MAP_CITY_RECT_REL,
                height: mapAverage / MAP_CITY_RECT_REL,
                key: `drawcapital${thisCitiesCords[0]}|${thisCitiesCords[1]}`,
                className: 'mapel-city-rect',
              };
            }
            if (city === 2) {
              cityProps = {
                cx: thisCitiesCords[0] - mapAverage / 10,
                cy: thisCitiesCords[1],
                r: mapAverage / MAP_CITY_CIRC_REL,
                key: `drawindependent${thisCitiesCords[0]}|${thisCitiesCords[1]}`,
                className: 'mapel-city-circ',
              };
            }
            const oneCity = createElement(
              svgElementType,
              { ...cityProps },
            );
            allCities = allCities.concat(oneCity);
          }
        }
      }
    }
  }
  return allCities;
};

export default renderCities;
