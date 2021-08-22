/* eslint-disable no-unused-vars */
import React from 'react';

import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootState } from '../../../../../states/rootState';
import { ORD_CLICK_ON_MAP_ZONE } from '../../../../../states/selectors/ordersSelectors';
import { UI_STATE_BOARDVIEW_COMM } from '../../../../../states/selectors/uiStateStelectors';
import getOffset from '../../../../converter/cords/getOffset';
import { returnMainZoneOfZone } from '../../../../converter/middle/dataMap/zonesLib';
import getPlayersNetAssets from '../../../../converter/middle/gamePositions/getPlayersNetAssets';
import { zoneLabelById } from '../../../../converter/middle/getZonePropsLib';
import dynamicOrdersList from '../../../../converter/middle/orders/dynamicOrdersList';
import returnOrderType from '../../../../converter/middle/orders/returnOrderType';
import ShipIcon from '../../../../icons/ship/ShipIcon';
import TankIcon from '../../../../icons/tank/TankIcon';
import './currentOrders.css';

const CurrentOrders = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { t } = useTranslation();
  const orderList = dynamicOrdersList(rs);
  const {
    thisVariant, thisGameName, thisGameId, thisPlayersRole, uiBoardLayout,
  } = rs;
  const zones = rs[`dataZones|${thisVariant}`] || {};
  const dataMap = rs[`dataMap|${thisVariant}`] || {};
  const dataGameTime = rs[`dataGameTime|${thisGameName}`];
  const { turnType } = dataGameTime || '';
  const dataZones = dataMap.zones;
  const dataGamePositions = rs[`dataGamePositions|${thisGameId}`];
  // const viewBox = rs[`dataViewBox|${thisVariant}`] || {};
  // const vbArr = viewBox.split(' ');

  const onHoverZoneButton = (e) => {
    if (uiBoardLayout !== UI_STATE_BOARDVIEW_COMM) {
      const zone = e.target.dataset.unitrow;
      const domUnits = document.querySelectorAll('[data-unitzone]');
      if (domUnits) {
        if (domUnits.length) {
          for (let i = 0; i < domUnits.length; i += 1) {
            const oneEl = domUnits[i];
            const oneVal = oneEl.dataset.unitzone;
            if (zone === oneVal) {
              oneEl.classList.add('blow');
            }
          }
        }
      }
    }
  };

  const onLeaveZoneButton = (e) => {
    // console.log('log', e.target);
    const zone = e.target.dataset.unitrow;
    const domUnits = document.querySelectorAll('[data-unitzone]');
    if (domUnits) {
      if (domUnits.length) {
        for (let i = 0; i < domUnits.length; i += 1) {
          const oneEl = domUnits[i];
          const oneVal = oneEl.dataset.unitzone;
          if (zone === oneVal) {
            oneEl.classList.remove('blow');
          }
        }
      }
    }
  };

  const onClickOnZoneButton = (az) => {
    if (uiBoardLayout !== UI_STATE_BOARDVIEW_COMM) {
      let cords = {};
      let domUnits = [];
      if (turnType === 'build') {
        domUnits = document.querySelectorAll('[data-zone]');
      } else {
        domUnits = document.querySelectorAll('[data-unitzone]');
      }
      if (domUnits) {
        if (domUnits.length) {
          for (let i = 0; i < domUnits.length; i += 1) {
            const oneEl = domUnits[i];
            const oneVal = turnType === 'build' ? returnMainZoneOfZone(dataZones, oneEl.dataset.zone) : oneEl.dataset.unitzone;
            if ((turnType === 'build' && returnMainZoneOfZone(dataZones, az).toString() === oneVal.toString())
          || (turnType !== 'build' && az.toString() === oneVal.toString())
            ) {
              cords = getOffset(oneEl);
            }
          }
        }
      }
      rd({
        type: ORD_CLICK_ON_MAP_ZONE,
        payload: returnMainZoneOfZone(dataZones, az),
        thisClick: { clientX: cords.left, clientY: cords.top },
      });
    }
  };

  return (
    <div className="ordbox">
      <div className="ordbox-ul-hdr-fr">
        <h3>{t('t_197')}</h3>
      </div>
      <ul className="ordbox-ul">
        {zones && orderList ? orderList.map((it) => {
          const [unitType, playersRole, orderType, activeZone, passiveZone, targetZone] = it;
          return (

            <li
              key={`key|x|${activeZone}`}
              className="curord-li"
            >
              <button
                type="button"
                data-unitrow={activeZone.toString()}
                onMouseEnter={onHoverZoneButton}
                // onMouseLeave={onLeaveZoneButton}
                onMouseOut={onLeaveZoneButton}
                onBlur={onLeaveZoneButton}
                onClick={() => onClickOnZoneButton(activeZone)}
              >

                {orderType !== 8 && orderType !== 7 && orderType !== 9 ? (
                  <>
                    {turnType !== 'build' ? (
                      <>
                        <div className="curord-li-icon">
                          {unitType === 1 ? <TankIcon /> : <ShipIcon />}
                        </div>
                        <div className="curord-li-lasmall">
                          {unitType === 1 ? 'A' : 'F'}
                        </div>
                      </>
                    ) : null}
                    <div className="curord-li-label">
                      {zoneLabelById(zones, activeZone)}
                    </div>
                  </>
                ) : null}

                {orderType !== 'UNSET' ? (
                  <>
                    {orderType === 4 ? (
                      <div className="curord-li-lasmall">
                        {returnOrderType(orderType)}

                      </div>
                    ) : null}
                    {orderType === 1 || orderType === 3 || orderType === 6 ? (
                      <>
                        <div className="curord-li-lasmall">
                          {returnOrderType(orderType)}
                        </div>
                        <div className="curord-li-label">
                          {zoneLabelById(zones, targetZone)}
                        </div>

                      </>
                    ) : null}
                    {orderType === 2 || orderType === 5 ? (
                      <>
                        <div className="curord-li-lasmall">
                          {returnOrderType(orderType)}
                        </div>
                        <div className="curord-li-label">
                          {zoneLabelById(zones, passiveZone)}
                        </div>

                        -

                        <div className="curord-li-label">
                          {zoneLabelById(zones, targetZone)}
                        </div>

                      </>
                    ) : null}
                    {orderType === 7 || orderType === 9 ? (
                      <>

                        <div className="curord-li-lasmall">
                          -
                        </div>

                        <div className="curord-li-lasmall">
                          {unitType === 1 ? 'A' : 'F'}
                        </div>

                        <div className="curord-li-label">
                          {zoneLabelById(zones, activeZone)}
                        </div>

                      </>
                    ) : null}
                    {orderType === 8 ? (
                      <>
                        +
                        {unitType === 1 ? 'A' : 'F'}
                        <div className="curord-li-label">
                          {zoneLabelById(zones, activeZone)}
                        </div>

                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                  </>
                )}
              </button>
            </li>

          );
        }) : null}
      </ul>
    </div>

  );
};

export default CurrentOrders;
