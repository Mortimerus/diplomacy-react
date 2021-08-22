import { createElement } from 'react';
import { unitCordsByZoneId } from '../../converter/middle/getZonePropsLib';
import { svgCrossProps } from '../svgElementProps/svgPosition';
import './renderForbiddens.css';

const renderForbiddens = (zones, forbiddens, viewBox) => {
  let allForbiddens = [];
  if (zones && forbiddens && viewBox) {
    if (forbiddens.length) {
      for (let i = 0; i < forbiddens.length; i += 1) {
        const oneForbiddenZoneId = forbiddens[i][1];
        const forbiddenCords = unitCordsByZoneId(zones, oneForbiddenZoneId);
        const svgForbiddens = createElement(
          ...svgCrossProps(forbiddenCords, viewBox, 'mapel-pos-forbiddens'),
        );
        allForbiddens = allForbiddens.concat([svgForbiddens]);
      }
    }
  }
  return allForbiddens;
};

export default renderForbiddens;
