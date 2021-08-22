import React, { useEffect } from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useTranslation } from 'react-i18next';
import { ORD_CANCEL_ONE_ORDER } from '../../../../states/selectors/ordersSelectors';
import { SET_ORDER_TYPE } from '../../../../states/selectors/uiSelectors';
import hasUnitOrder from '../../../converter/middle/orders/hasUnitOrder';
import { getCoastalZoneLabel, returnCoastalZonesOfZone } from '../../../converter/middle/dataMap/zonesLib';
import './buildBtn.css';

const BuildBtn = ({ rs, rd }) => {
  const {
    thisZoneInfo, thisOrders, thisVariant,
  } = rs;
  const { t } = useTranslation();
  // const currentPosition = rs[`dataGamePositions|${thisGameId}`];
  const {
    geography, zid,
  } = thisZoneInfo || '';
  const dataMap = rs[`dataMap|${thisVariant}`];
  const dataCoastNames = rs[`dataCoastNames|${thisVariant}`];
  const { zones } = dataMap || [];

  useEffect(() => {
    const btns = document.getElementsByClassName('uimute-c1');
    // const btns2 = document.getElementsByClassName('uimute-c2');
    if (btns.length) {
      for (let i = 0; i < btns.length; i += 1) {
        if (btns[i].value === 'c') {
          console.log('from useEffect loop', btns);
          for (let j = 0; j < btns.length; j += 1) {
            if (btns[j].value === 'b') {
              console.log('inside');
              btns[j].classList.add('mute');
            }
          }
        }
      }
    }
  }, []);

  return (
    <>
      {console.log('coastalzones.....', returnCoastalZonesOfZone(zones, zid))}
      {hasUnitOrder(thisOrders, zid) ? (
        <button className="btn-orders clickable" type="button" onClick={() => rd({ type: ORD_CANCEL_ONE_ORDER, payload: zid })}>
          {/* cancel build */}
          {t('t_208')}
        </button>
      ) : (
        <>

          {geography === 2 ? (
            <button
              className="btn-orders clickable"
              type="button"
              onClick={() => rd({
                type: SET_ORDER_TYPE,
                orderType: 8,
                unitZone: zid,
                typeUnit: 1,
              })}
            >
              {/* build army */}
              {t('t_203')}
            </button>
          ) : null}

          {geography === 1 ? (
            <>
              <button
                type="button"
                className="uimute-c1 btn-orders clickable"
                value="b"
                onClick={() => rd({
                  type: SET_ORDER_TYPE,
                  orderType: 8,
                  unitZone: zid,
                  typeUnit: 1,
                })}
              >
                {/* build army */}
                {t('t_203')}
              </button>
              {/** build fleet, coastal zone exeption (stp) */}
              {returnCoastalZonesOfZone(zones, zid).length ? (
                <>
                  {returnCoastalZonesOfZone(zones, zid).map((czid) => (
                    <React.Fragment key={`keyFragBuildBtn|${czid}`}>

                      {hasUnitOrder(thisOrders, czid) ? (
                        <button
                          className="uimute-c1 btn-orders clickable"
                          key={`keyCancelCoast${czid}`}
                          type="button"
                          value="c"
                          onClick={() => rd({ type: ORD_CANCEL_ONE_ORDER, payload: czid })}
                        >
                          {/* cancel */}
                          {t('t_205')}
                        </button>
                      ) : (
                        <button
                          className="uimute-c1 btn-orders clickable"
                          key={`keyChooseCoast${czid}`}
                          type="button"
                          value="b"
                          onClick={() => rd({
                            type: SET_ORDER_TYPE,
                            orderType: 8,
                            unitZone: czid,
                            typeUnit: 2,
                            hasCoastalChoice: czid,
                          })}
                        >
                          {/* fleet in */}
                          {t('t_206')}
                          {' '}
                          {getCoastalZoneLabel(zones, czid, dataCoastNames)}
                        </button>

                      ) }

                    </React.Fragment>
                  ))}

                </>
              ) : (
                <button
                  type="button"
                  className="btn-orders clickable"
                  onClick={() => rd({
                    type: SET_ORDER_TYPE,
                    orderType: 8,
                    unitZone: zid,
                    typeUnit: 2,
                  })}
                >
                  {/* buil fleet */}
                  {t('t_207')}

                </button>
              )}

            </>
          ) : null}

        </>
      )}

    </>
  );
};

export default BuildBtn;

BuildBtn.propTypes = {
  rs: PropTypes.objectOf(oneOfType([
    PropTypes.string, PropTypes.array, PropTypes.object, PropTypes.bool, PropTypes.number,
  ])).isRequired,
  rd: PropTypes.func.isRequired,
};
