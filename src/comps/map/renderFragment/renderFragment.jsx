import React from 'react';

export const renderUnitLight = () => (
  <filter id="unitlight" key="unitblurkey">
    <feSpecularLighting
      result="specOut"
      specularExponent="20"
      lightingColor="#eee"
    >
      <fePointLight x="1" y="1" z="1" />
    </feSpecularLighting>
    <feComposite
      in="SourceGraphic"
      in2="specOut"
      operator="arithmetic"
      k1="0"
      k2="1"
      k3="1"
      k4="0"
    />
  </filter>
);

export const renderUnitBlur = () => (
  <filter id="unitshadow" key="unitfilterkey">
    <feGaussianBlur
      in="SourceAlpha"
      stdDeviation="2"
      filterRes="res"
    />
    <feDropShadow dx="2" dy="4" floodColor="#000" floodOpacity="0.6" stdDeviation="2" />
    <feMerge>
      <feMergeNode />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);

export const renderZoneLight = () => (
  <filter id="zonelight" key="zonefilterkey">
    <feSpecularLighting
      result="specOut"
      specularExponent="33"
      lightingColor="#bbb"
    >
      <fePointLight x="1" y="1" z="1" />
    </feSpecularLighting>
    <feComposite
      in="SourceGraphic"
      in2="specOut"
      operator="arithmetic"
      k1="0"
      k2="1"
      k3="1"
      k4="0"
    />
  </filter>
);
