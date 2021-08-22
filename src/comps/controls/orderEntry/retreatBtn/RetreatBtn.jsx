import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { useTranslation } from 'react-i18next';
import hasUnitOrder from '../../../converter/middle/orders/hasUnitOrder';
import { SET_ORDER_TYPE } from '../../../../states/selectors/uiSelectors';
import { ORD_CANCEL_ONE_ORDER } from '../../../../states/selectors/ordersSelectors';

const RetreatBtn = ({ rs, rd }) => {
  const {
    thisZoneInfo, thisOrders,
  } = rs;
  const { t } = useTranslation();
  const { dislodged } = thisZoneInfo || {};
  const { disUnitZone } = dislodged || {};

  return (
    <>
      {hasUnitOrder(thisOrders, disUnitZone) ? (
        <button className="clickable" type="button" onClick={() => rd({ type: ORD_CANCEL_ONE_ORDER, payload: disUnitZone })}>
          {/** cancel */}
          {t('t_205')}
        </button>
      ) : (
        <>
          <button
            type="button"
            className="btn-orders clickable"
            onClick={() => rd({
              type: SET_ORDER_TYPE,
              orderType: 6,
              unitZone: disUnitZone,
            })}
          >
            {/** retreat */}
            {t('t_068')}
          </button>

          <button
            type="button"
            className="btn-orders clickable"
            onClick={() => rd({
              type: SET_ORDER_TYPE,
              orderType: 7,
              unitZone: disUnitZone,
            })}
          >
            {/** dispand */}
            {t('t_209')}
          </button>

        </>
      )}
    </>
  );
};

export default RetreatBtn;

RetreatBtn.propTypes = {
  rs: PropTypes.objectOf(oneOfType([
    PropTypes.string, PropTypes.array, PropTypes.object, PropTypes.bool, PropTypes.number,
  ])).isRequired,
  rd: PropTypes.func.isRequired,
};
