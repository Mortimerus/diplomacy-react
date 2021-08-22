import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import transcriptOneOrderByZoneId from '../../../converter/middle/orders/transcriptOneOrderByZoneId';
import './transcriptOneOrder.css';

const TranscriptOneOrder = ({ rs, zoneId, t }) => {
  const { arrOutput } = transcriptOneOrderByZoneId(rs, zoneId, t);
  const [unitType, orderType, activeZone, passiveZone, targetZone] = arrOutput;

  return (
    <>
      {arrOutput ? (
        <div className="trscr-oneorder-fr">

          {orderType > 6 ? (
            <span>
              {orderType === 8 ? '+' : null}
              {orderType === 9 ? '-' : null}
              {orderType === 7 ? '-' : null}
            </span>
          ) : null}

          <span>
            {unitType === 1 ? 'A' : null}
            {unitType === 2 ? 'F' : null}
          </span>

          <span className="trscr-oneorder-ital">
            {activeZone}
          </span>

          {orderType === 2 || orderType === 3 ? (
            <span>
              S
            </span>
          ) : null}

          {orderType === 4 ? (
            <span>
              H
            </span>
          ) : null}

          {orderType === 5 ? (
            <span>
              C
            </span>
          ) : null}

          {orderType === 6 ? (
            <span>
              R
            </span>
          ) : null}

          {passiveZone ? (
            <span className="trscr-oneorder-ital">
              {passiveZone}
            </span>
          ) : null}

          {targetZone ? (
            <>
              {orderType !== 3 ? (
                <span>
                  -
                </span>
              ) : null}
              <span className="trscr-oneorder-ital">
                {targetZone}
              </span>
            </>
          ) : null}

        </div>
      ) : null}

    </>
  );
};

export default TranscriptOneOrder;

TranscriptOneOrder.propTypes = {
  rs: PropTypes.objectOf(oneOfType(
    [PropTypes.string, PropTypes.array,
      PropTypes.object, PropTypes.number, PropTypes.bool],
  )).isRequired,
  t: PropTypes.func.isRequired,
  zoneId: PropTypes.string.isRequired,
};
