import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { svgbgPatternsArr } from '../../constants/defaults/uiConfig';

const svgbgSETTER = (choosenBG) => {
  let output = {};
  if (choosenBG && svgbgPatternsArr) {
    for (let i = 0; i < svgbgPatternsArr.length; i += 1) {
      const [patternKey, PatternSVG, patternDim] = svgbgPatternsArr[i];
      if (patternKey === 'none') {
        output = {
          backgroundImage: 'none',
        };
      } else if (patternKey === choosenBG) {
        const svgString = encodeURIComponent(renderToStaticMarkup(<PatternSVG />));
        output = {
          backgroundImage: `url("data:image/svg+xml,${svgString}")`,
          backgroundSize: patternDim,
        };
      }
    }
  }
  return output;
};

export default svgbgSETTER;
