import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRootDispatch, useRootState } from '../../../states/rootState';
import { ORD_CANCEL_ONE_ORDER } from '../../../states/selectors/ordersSelectors';
import getPlayersNetAssets from '../../converter/middle/gamePositions/getPlayersNetAssets';
import hasUnitOrder from '../../converter/middle/orders/hasUnitOrder';
import BuildBtn from './buildBtn/BuildBtn';
import OrderTypeTwinBtn from './orderTypeTwinBtn/OrderTypeTwinBtn';
import RetreatBtn from './retreatBtn/RetreatBtn';
import './orderEntry.css';
import TranscriptOneOrder from './transcriptOneOrder/TranscriptOneOrder';

const OrderEntry = () => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { t } = useTranslation();
  const {
    thisOrdersNeeded, thisPlayersRole, thisOrders,
    thisZoneInfo, thisGameName, thisGameId, thisAskForCoastalZone,
  } = rs;
  const {
    unit, geography, isStartCenter, dislodged,
  } = thisZoneInfo || '';
  const { owner, type, zone } = unit || '';
  const gameTime = rs[`dataGameTime|${thisGameName}`];
  const { turnType } = gameTime || '';
  const { disOwner } = dislodged || '';

  const currentPosition = rs[`dataGamePositions|${thisGameId}`];

  return (
    <div className="zoneinfo-gr-ords">
      {thisPlayersRole > 0 ? (
        <>
          {!hasUnitOrder(thisOrders, zone) ? (
            <>
              {(thisAskForCoastalZone === null && owner === thisPlayersRole.toString()
                && thisOrdersNeeded)
              || (disOwner === thisPlayersRole.toString()) ? (
                <>

                  {turnType === 'move' ? (
                    <>
                      <OrderTypeTwinBtn
                        orderType={1}
                        orderLabel={t('t_100')}
                      />
                      <OrderTypeTwinBtn
                        orderType={4}
                        orderLabel={t('t_101')}
                      />
                      <OrderTypeTwinBtn
                        orderType={3}
                        orderLabel={t('t_102')}
                      />
                      <OrderTypeTwinBtn
                        orderType={2}
                        orderLabel={t('t_103')}
                      />
                      {geography === 3 && type === 2 ? (
                        <OrderTypeTwinBtn
                          orderType={5}
                          orderLabel={t('t_104')}
                        />
                      ) : null}
                    </>
                  ) : null}

                  {/** dispand */}
                  {turnType === 'build' ? (
                    <>
                      {getPlayersNetAssets(currentPosition, thisPlayersRole) < 0 ? (
                        <OrderTypeTwinBtn
                          orderType={9}
                          orderLabel="dispand"
                        />
                      ) : null}
                    </>
                  ) : null}

                </>
                ) : null}

              {turnType === 'build' && getPlayersNetAssets(currentPosition, thisPlayersRole) > 0
                && isStartCenter === thisPlayersRole && unit === '' ? (
                  <BuildBtn
                    rs={rs}
                    rd={rd}
                  />

                ) : null}

              {turnType === 'retreat' ? (
                <RetreatBtn
                  rs={rs}
                  rd={rd}
                />
              ) : null}

            </>
          ) : (
            <>
              <TranscriptOneOrder
                rs={rs}
                zoneId={zone}
                t={t}
              />
              <button className="btn-orders clickable" type="button" onClick={() => rd({ type: ORD_CANCEL_ONE_ORDER, payload: zone })}>
                {/** cancel */}
                {t('t_205')}
              </button>
            </>
          )}

        </>
      ) : null}
    </div>
  );
};

export default OrderEntry;
