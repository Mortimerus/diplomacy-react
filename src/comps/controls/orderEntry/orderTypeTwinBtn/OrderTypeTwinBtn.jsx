import React from 'react';
import PropTypes from 'prop-types';
import { SET_ORDER_TYPE } from '../../../../states/selectors/uiSelectors';
import { useRootDispatch, useRootState } from '../../../../states/rootState';
import './orderTypeTwinBtn.css';

const OrderTypeTwinBtn = ({ orderType, orderLabel }) => {
  const rs = useRootState();
  const rd = useRootDispatch();
  const { thisZoneInfo } = rs;
  const { unit: { zone } } = thisZoneInfo || '';
  return (
    <button onMouseDown={(e) => e.stopPropagation()} onMouseUp={(e) => e.stopPropagation()} className="btn-orders clickable" type="button" onClick={() => rd({ type: SET_ORDER_TYPE, orderType, unitZone: zone })}>
      {orderLabel}
    </button>
  );
};

export default OrderTypeTwinBtn;

OrderTypeTwinBtn.propTypes = {
  orderType: PropTypes.number.isRequired,
  orderLabel: PropTypes.string.isRequired,
};
