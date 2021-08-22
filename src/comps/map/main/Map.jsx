/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef } from 'react';
// import { useTranslation } from 'react-i18next';
import RenderMap from '../renderMap/RenderMap';
import { useRootDispatch, useRootState } from '../../../states/rootState';
import { RS_POST_SPREAD_OBJ } from '../../../states/selectors/sharedSelectors';
import './map.css';
// import { UI_STATE_BOARDVIEW_DEFAULT,
//  UI_STATE_BOARDVIEW_FULLMAP } from '../../../states/selectors/uiStateStelectors';
import renderCities from '../renderCities/renderCities';
import renderLabels from '../renderLabels/renderLabels';
import renderUnits from '../renderUnits/renderUnits';
import {
  renderUnitLight, renderUnitBlur, renderZoneLight,
} from '../renderFragment/renderFragment';
import renderDislodgedOnes from '../renderDislodgedOnes/renderDislodgedOnes';
import renderTransitions from '../renderTransitions/renderTransitions';
import renderForbiddens from '../renderForbiddens/renderForbiddens';
import renderSingleForbidden from '../renderSingleForbidden/renderSingleForbidden';

const Map = () => {
  const rs = useRootState();
  const ref = useRef();
  const rd = useRootDispatch();
  // const { t } = useTranslation();

  const {
    thisCurrentAdvancement, thisVariant, thisTurnMode, thisOrders, thisZoneInfo,
    thisGameId, thisGameName, thisFakeUnits, thisForbidden, thisOrderType,
  } = rs;

  const geography = rs[`dataSVG|${thisVariant}`];
  const viewBox = rs[`dataViewBox|${thisVariant}`];
  const zones = rs[`dataZones|${thisVariant}`];
  const gamePosition = rs[`dataGamePositions|${thisGameId}`];
  const gameTransitions = rs[`dataGameTransitions|${thisGameId}|${thisCurrentAdvancement - 1}`];
  const gameTransitions2 = rs[`dataGameTransitions|${thisGameId}|${thisCurrentAdvancement - 2}`];
  const gameTime = rs[`dataGameTime|${thisGameName}`];
  const { turnType } = gameTime || [];

  // const submittedOrders = rs[`dataGameOrders|${thisGameId}`];

  const citiesRender = useMemo(() => renderCities(zones, viewBox), [zones, viewBox]);
  const labelsRender = useMemo(() => renderLabels(zones, viewBox), [zones, viewBox]);

  const unitsRender = useMemo(() => renderUnits(zones, gamePosition
    ? gamePosition.units : [], viewBox),
  [zones, gamePosition, viewBox]);
  // eslint-disable-next-line no-unused-vars
  const forbiddensRender = useMemo(() => renderForbiddens(zones, gamePosition
    ? gamePosition.forbiddens : [], viewBox), [zones, gamePosition, viewBox]);
  const dislodgedOnesOnesRender = useMemo(() => renderDislodgedOnes(zones, gamePosition
    ? gamePosition.dislodgedOnes : [], viewBox),
  [zones, gamePosition, viewBox]);

  const forbiddenSingleRender = useMemo(() => renderSingleForbidden(zones, thisForbidden || [],
    viewBox), [zones, thisForbidden, viewBox]);

  // const sumbittedOrdersRender = useMemo(() => renderTransitions(zones, submittedOrders,
  //   viewBox), [zones, submittedOrders, viewBox]);

  const transitionsRender = useMemo(() => renderTransitions(zones, gameTransitions,
    viewBox), [zones, gameTransitions, viewBox]);
  const transitionsRender2 = useMemo(() => renderTransitions(zones, gameTransitions2,
    viewBox), [zones, gameTransitions2, viewBox]);

  const ordersRender = useMemo(() => renderTransitions(
    zones, { orders: thisOrders, fake_units: thisFakeUnits },
    viewBox,
  ), [zones, thisOrders, viewBox, thisFakeUnits]);

  const transitionUnitsRender = useMemo(() => renderUnits(zones, gameTransitions
    ? gameTransitions.units : [], viewBox),
  [zones, gameTransitions, viewBox]);
  const transitionUnitsRender2 = useMemo(() => renderUnits(zones, gameTransitions2
    ? gameTransitions2.units : [], viewBox),
  [zones, gameTransitions2, viewBox]);
  const transitionFobiddensRender = useMemo(() => renderForbiddens(zones, gameTransitions
    ? gameTransitions.forbiddens : [], viewBox),
  [zones, gameTransitions, viewBox]);
  const transitionFobiddensRender2 = useMemo(() => renderForbiddens(zones, gameTransitions2
    ? gameTransitions2.forbiddens : [], viewBox),
  [zones, gameTransitions2, viewBox]);
  const transitionDislodgedOnes = useMemo(() => renderDislodgedOnes(zones, gameTransitions
    ? gameTransitions.dislodgedOnes : [], viewBox),
  [zones, gameTransitions, viewBox]);
  const transitionDislodgedOnes2 = useMemo(() => renderDislodgedOnes(zones, gameTransitions2
    ? gameTransitions2.dislodgedOnes : [], viewBox),
  [zones, gameTransitions2, viewBox]);

  const allInteractions = useMemo(() => [
    renderUnitLight(),
    renderZoneLight(),
    renderUnitBlur(),
    citiesRender,
    labelsRender,
    thisCurrentAdvancement > 0 && thisTurnMode === -1 ? transitionsRender : [],
    thisCurrentAdvancement > 1 && thisTurnMode === -2 ? transitionsRender2 : [],
    thisCurrentAdvancement > 0 && thisTurnMode === 0 && turnType === 'retreat' ? forbiddensRender : [],
    // turnType !== 'retreat' && thisCurrentAdvancement >
    // 1 && thisTurnMode === -1 ? transitionFobiddensRender2 : [],
    thisCurrentAdvancement > 0 && thisTurnMode === -1 ? transitionDislodgedOnes : [],
    thisCurrentAdvancement > 1 && thisTurnMode === -2 ? transitionDislodgedOnes2 : [],
    // turnType !== 'move' && turnType !== 'build' && thisCurrentAdvancement > 0 && thisTurnMode < 0 ? transitionUnitsRender : [],
    thisCurrentAdvancement > 0 && thisTurnMode === -1 ? transitionUnitsRender : [],
    thisCurrentAdvancement > 1 && thisTurnMode === -2 ? transitionUnitsRender2 : [],
    // thisTurnMode === 0 ? forbiddensRender : [],
    thisTurnMode === 0 ? dislodgedOnesOnesRender : [],
    thisTurnMode === 0 ? ordersRender : [],
    // boardShowCurrentOrders ? sumbittedOrdersRender : [],
    thisTurnMode === 0 ? unitsRender : [],
    forbiddenSingleRender.length ? forbiddenSingleRender : [],
  ], [citiesRender, dislodgedOnesOnesRender, labelsRender, thisCurrentAdvancement,
    thisTurnMode, transitionDislodgedOnes, transitionDislodgedOnes2,
    transitionUnitsRender, transitionUnitsRender2, transitionsRender,
    transitionsRender2, unitsRender, ordersRender, turnType, forbiddensRender,
    forbiddenSingleRender]);

  useEffect(() => {
    if (ref) {
      rd({ type: RS_POST_SPREAD_OBJ, payload: { mapRef: ref.current } });
    }
  }, [ref, rd]);

  return (

    <div
      className="mapfr default"
      ref={ref}
    >
      {geography && viewBox ? (
        <div className={`mapcont-adj${thisZoneInfo !== null ? ' dispzinfo' : ''}${thisOrderType !== 0 ? ' enterords' : ''}${thisTurnMode === 0 ? ' currzinfo' : ''}`}>
          <RenderMap
            dataSVG={geography}
            dataViewBox={viewBox}
            interactions={allInteractions}
            dispatcher={rd}
          />
        </div>
      ) : null}
    </div>

  );
};

export default Map;
