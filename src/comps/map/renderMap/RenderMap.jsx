import { createElement, useRef } from 'react';
import { ORD_CLICK_ON_MAP_ZONE } from '../../../states/selectors/ordersSelectors';
import './renderMap.css';

const RenderMap = ({
  dataSVG, dataViewBox, interactions, dispatcher,
}) => {
  const ref = useRef();
  const elements = dataSVG;
  const svgElementStyle = {
    viewBox: dataViewBox,
    className: 'mapsvg',
    ref,
  };
  const clickOnMap = (e) => {
    const zo = e.target.getAttribute('data-zone');

    dispatcher({
      type: ORD_CLICK_ON_MAP_ZONE,
      payload: zo,
      thisClick: { clientX: e.clientX, clientY: e.clientY },
    });
    const svg = document.getElementsByClassName('mapsvg')[0];
    const pt = svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;

    const cursorpt = pt.matrixTransform(svg.getScreenCTM().inverse());
    const cords = `====================== \n X: ${cursorpt.x} | Y: ${cursorpt.y} \n ====================== `;
    console.log('zone', zo, '\n', 'native', e, '\n', cords);
  };

  let allPaths = [];
  // paths / children
  for (let i = 0; i < elements.length; i += 1) {
    const svgChildType = elements[i][0][0];
    let svgChildElementProps = {};
    // text

    // path
    if (svgChildType === 'path') {
      const mapElementType = elements[i][1][0];
      // area
      if (mapElementType === 'a') {
        const mapAreaType = elements[i][1][1];
        const mapAreaId = elements[i][1][2];
        const mapAreaPath = elements[i][2][0];
        const countryId = elements[i][1][3];
        let className = '';
        // land
        if (mapAreaType === 'l') {
          className = 'area land';
        }
        // water
        if (mapAreaType === 'w') {
          className = 'area water';
        }
        svgChildElementProps = {
          ...svgChildElementProps,
          key: mapAreaId,
          id: mapAreaId,
          d: mapAreaPath,
          onClick: (e) => clickOnMap(e),
          className,
          'data-zone': countryId,
          // style: { opacity: 0.5 },
          // filter: 'url(#zonefilter) url(#zoneblur)',
          // filter: 'url(#zonefilter)',
          // value: elements[i][1][1],
        };
      }
    }

    // make one element
    const svgChildElement = createElement(
      svgChildType,
      { ...svgChildElementProps },
    );
    // all elements
    allPaths = allPaths.concat(svgChildElement);
  }
  // svg / parent
  const svgElement = createElement(
    'svg',
    { ...svgElementStyle, ref },
    allPaths.concat(interactions),
  );

  return svgElement;
};

export default RenderMap;
