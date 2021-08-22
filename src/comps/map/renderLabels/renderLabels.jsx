/**
dataZones: dataZones|<variant>
 */

import { createElement } from 'react';
import { MAP_LABEL_FONT_SIZE_REL } from '../../../constants/defaults/uiConfig';
import viewBoxToMapNormal from '../../converter/cords/viewBoxToMapNormal';
import './renderLabels.css';

const renderLabels = (dataZones, dataViewBox) => {
  let allLabels = [];
  if (dataZones && dataViewBox) {
    const mapNormal = viewBoxToMapNormal(dataViewBox).n;

    for (let i = 0; i < dataZones.length; i += 1) {
      const thisZonesProps = dataZones[i][1];
      const coordLabel = thisZonesProps.coord_label;
      if (coordLabel.length) {
        const { label } = thisZonesProps;
        const thisLabelsCords = thisZonesProps.coord_label;
        const labelProps = {
          // x coord correction; place city left from coord point
          x: coordLabel[0] - mapNormal,
          y: coordLabel[1],
          key: `drawlabel${thisLabelsCords[0]}|${thisLabelsCords[1]}`,
          fontSize: mapNormal / MAP_LABEL_FONT_SIZE_REL,
          className: 'mapel-label',
        };
        const oneCity = createElement(
          'text',
          { ...labelProps },
          label,
        );
        allLabels = allLabels.concat(oneCity);
      }
    }
  }
  return allLabels;
};

export default renderLabels;
