import { createElement } from 'react';
import { unitCordsByZoneId } from '../../converter/middle/getZonePropsLib';
import { svgCrossProps } from '../svgElementProps/svgPosition';
import './renderSingleForbidden.css';

const renderSingleForbidden = (zones, forbidden, viewBox) => {
  let allForbiddens = [];
  if (zones && forbidden && viewBox) {
    if (forbidden.length) {
      const oneForbiddenZoneId = forbidden[0].toString();
      const forbiddenCords = unitCordsByZoneId(zones, oneForbiddenZoneId);
      const svgForbiddens = createElement(
        ...svgCrossProps(forbiddenCords, viewBox, 'mapel-pos-forbidden-single'),
      );
      allForbiddens = allForbiddens.concat([svgForbiddens]);
    }
  }
  return allForbiddens;
};

export default renderSingleForbidden;
